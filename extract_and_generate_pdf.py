import os
import re
import sys
import warnings
from fpdf import FPDF

# Suppress deprecation warnings from fpdf2
warnings.filterwarnings("ignore", category=DeprecationWarning)

# Custom PDF class with beautiful header, footer, and page numbering
class MalvinasScriptPDF(FPDF):
    def header(self):
        if self.page_no() == 1:
            return # Skip header on title page
        self.set_text_color(53, 68, 106) # Deep Blue (#35446a)
        self.set_font('helvetica', 'B', 8)
        self.cell(0, 10, 'PROYECTO NARRATIVO TRANSMEDIA: MALVINAS EN PRIMERA PERSONA', 0, 1, 'R')
        self.set_draw_color(180, 83, 84) # Terracotta Accent Line (#b45354)
        self.set_line_width(0.5)
        self.line(10, 18, 200, 18)
        self.ln(5)

    def footer(self):
        self.set_y(-15)
        self.set_font('helvetica', 'I', 8)
        self.set_text_color(123, 152, 171) # Sky Blue (#7b98ab)
        self.cell(0, 10, f'Pagina {self.page_no()}/{{nb}}', 0, 0, 'C')

def clean_text(text):
    if not text:
        return ""
    # Standardize spaces and clean up characters not supported by standard latin-1
    replacements = {
        '\u201c': '"',
        '\u201d': '"',
        '\u2018': "'",
        '\u2019': "'",
        '\u2014': '--',
        '\u2013': '-',
        '\u2026': '...',
        '\u2192': '->',  # arrow
        '\u200b': '',  # zero-width space
        '\ufeff': '',  # BOM
    }
    for k, v in replacements.items():
        text = text.replace(k, v)
    # Ensure it encodes perfectly to latin-1
    return text.encode('latin-1', 'replace').decode('latin-1').strip()

def extract_field(field_name, text):
    # Match field_name: 'value' or "value" or `value`
    pattern = rf"{field_name}:\s*(['\"`])(.*?)\1"
    m = re.search(pattern, text, re.DOTALL)
    if m:
        val = m.group(2)
        val = val.replace('\\n', '\n').replace('\\"', '"').replace("\\'", "'")
        return val.strip()
    return None

def parse_choices(scene_text):
    choices_block_match = re.search(r"choices:\s*\[(.*?)\]", scene_text, re.DOTALL)
    if not choices_block_match:
        return []
    choices_block = choices_block_match.group(1)
    choice_pattern = r"\{\s*label:\s*['\"`](.*?)['\"`],\s*next:\s*['\"`](.*?)['\"`](?:,\s*effects:\s*\{(.*?)\})?\s*\}"
    choices = []
    for m in re.finditer(choice_pattern, choices_block):
        label = clean_text(m.group(1))
        next_scene = m.group(2)
        effects_str = m.group(3) or ""
        effects = {}
        if effects_str:
            for pair in re.split(r",\s*", effects_str.strip()):
                parts = re.split(r":\s*", pair)
                if len(parts) == 2:
                    effects[parts[0].strip()] = parts[1].strip()
        choices.append({
            'label': label,
            'next': next_scene,
            'effects': effects
        })
    return choices

def parse_memories(scene_text):
    memories_pattern = r"includes\(['\"](.*?)['\"]\)\)\s*lines\.push\(['\"](.*?)['\"]\)"
    memories = []
    for m in re.finditer(memories_pattern, scene_text):
        cond = clean_text(m.group(1))
        text = clean_text(m.group(2))
        memories.append({
            'condition': cond,
            'text': text
        })
    return memories

def main():
    jsx_path = 'src/pages/MalvinasJuegoSerio.jsx'
    if not os.path.exists(jsx_path):
        print(f"Error: No se encontro el archivo en {jsx_path}")
        sys.exit(1)

    with open(jsx_path, 'r', encoding='utf-8') as f:
        content = f.read()

    # Extract SCENES block
    scenes_match = re.search(r'const SCENES = \{(.*?)\n\s*\};', content, re.DOTALL)
    if not scenes_match:
        print("Error: No se encontro el bloque const SCENES en el archivo JSX.")
        sys.exit(1)
    scenes_block = scenes_match.group(1)

    # Find all scene headers (e.g. key: {)
    scene_headers = list(re.finditer(r'(?:^|\n)\s*([a-zA-Z0-9_]+):\s*\{', scenes_block))
    parsed_scenes = []

    for i in range(len(scene_headers)):
        start_idx = scene_headers[i].start()
        end_idx = scene_headers[i+1].start() if i + 1 < len(scene_headers) else len(scenes_block)
        scene_text = scenes_block[start_idx:end_idx]
        key = scene_headers[i].group(1)

        chapter = clean_text(extract_field('chapter', scene_text))
        title = clean_text(extract_field('title', scene_text))
        text = clean_text(extract_field('text', scene_text))
        info = clean_text(extract_field('info', scene_text))
        choices = parse_choices(scene_text)
        memories = parse_memories(scene_text)

        day_match = re.search(r"day:\s*(\d+|null|undefined)", scene_text)
        day = day_match.group(1) if day_match else "N/A"

        parsed_scenes.append({
            'key': key,
            'chapter': chapter,
            'title': title,
            'day': day,
            'text': text,
            'info': info,
            'choices': choices,
            'memories': memories
        })

    print(f"Se extrajeron exitosamente {len(parsed_scenes)} escenas del juego interactivo.")

    # Generate PDF
    pdf = MalvinasScriptPDF()
    pdf.alias_nb_pages()
    pdf.set_margins(15, 20, 15)

    # 1. TITLE PAGE
    pdf.add_page()
    pdf.set_fill_color(9, 9, 12) # Dark Smoke Background
    pdf.rect(0, 0, 210, 297, 'F')

    pdf.set_y(80)
    pdf.set_font('helvetica', 'B', 14)
    pdf.set_text_color(180, 83, 84) # Terracotta
    pdf.cell(0, 10, 'PROYECTO TRANSMEDIA', 0, 1, 'C')

    pdf.ln(10)
    pdf.set_font('times', 'BI', 44)
    pdf.set_text_color(240, 236, 229) # Old Paper / White
    pdf.cell(0, 20, 'Malvinas', 0, 1, 'C')
    pdf.set_font('times', 'I', 28)
    pdf.cell(0, 15, 'en primera persona', 0, 1, 'C')

    # Line separator
    pdf.ln(10)
    pdf.set_draw_color(123, 152, 171) # Sky Blue
    pdf.set_line_width(1)
    pdf.line(40, pdf.get_y(), 170, pdf.get_y())
    pdf.ln(15)

    pdf.set_font('helvetica', 'B', 16)
    pdf.set_text_color(240, 236, 229)
    pdf.cell(0, 10, 'GUION NARRATIVO COMPLETO Y TEXTOS', 0, 1, 'C')

    pdf.ln(5)
    pdf.set_font('helvetica', '', 10)
    pdf.set_text_color(123, 152, 171) # Sky Blue
    pdf.cell(0, 10, 'Documento de Referencia Tecnico y Pedagogico', 0, 1, 'C')

    pdf.set_y(220)
    pdf.set_font('helvetica', 'B', 10)
    pdf.set_text_color(240, 236, 229)
    pdf.cell(0, 6, 'STAND INMERSIVO ITINERANTE', 0, 1, 'C')
    pdf.set_font('helvetica', '', 9)
    pdf.set_text_color(123, 152, 171)
    pdf.cell(0, 5, 'Fundamentos de la Computacion - SimuTec', 0, 1, 'C')
    pdf.cell(0, 5, 'Gran Buenos Aires, Argentina', 0, 1, 'C')

    # 2. DOCUMENT BODY
    for s in parsed_scenes:
        pdf.add_page()
        pdf.ln(5)

        # Chapter Tag and Day Indicator
        pdf.set_font('helvetica', 'B', 10)
        pdf.set_text_color(180, 83, 84) # Terracotta
        ch_str = f"CAPITULO {s['chapter'].upper()}" if s['chapter'] and s['chapter'] not in ['Prólogo', 'Epílogo', 'Epílogo II'] else s['chapter'].upper()
        day_str = f" - DIA {s['day']}" if s['day'] not in ["N/A", "null", "undefined"] else ""
        pdf.cell(0, 6, f"{ch_str}{day_str}  [ID de Escena: {s['key']}]", 0, 1, 'L')

        # Title of the Scene
        pdf.set_font('times', 'BI', 22)
        pdf.set_text_color(53, 68, 106) # Deep Blue
        pdf.cell(0, 12, s['title'], 0, 1, 'L')
        pdf.ln(2)

        # Historical Context block if exists
        if s['info']:
            pdf.set_fill_color(240, 244, 248) # Light blue/grey box
            pdf.set_text_color(30, 41, 59)
            pdf.set_font('helvetica', 'BI', 8.5)

            # Print context cell
            pdf.multi_cell(0, 5, f"CONTEXTO HISTORICO:\n{s['info']}", 1, 'L', fill=True)
            pdf.ln(4)

        # Narrative Text (Standard multi-line body)
        pdf.set_font('times', '', 11.5)
        pdf.set_text_color(9, 9, 12) # Dark Smoke Text
        pdf.multi_cell(0, 6, s['text'], 0, 'L')
        pdf.ln(8)

        # Memories block if exists
        if s['memories']:
            pdf.set_font('helvetica', 'B', 9)
            pdf.set_text_color(180, 83, 84) # Terracotta
            pdf.cell(0, 6, 'MEMORIA NARRATIVA (Disparada por elecciones previas):', 0, 1, 'L')
            pdf.set_font('helvetica', 'I', 9.5)
            pdf.set_text_color(53, 68, 106)
            for m in s['memories']:
                pdf.multi_cell(0, 5.5, f"• Si elegiste '{m['condition']}':\n  \"{m['text']}\"", 0, 'L')
                pdf.ln(2)
            pdf.ln(4)

        # Choices and branching
        if s['choices']:
            pdf.set_font('helvetica', 'B', 10)
            pdf.set_text_color(53, 68, 106) # Deep Blue
            pdf.cell(0, 6, 'DECISIONES DEL JUGADOR Y CONSECUENCIAS:', 0, 1, 'L')
            pdf.ln(2)

            for idx, c in enumerate(s['choices'], 1):
                # Choice Label
                pdf.set_font('helvetica', 'B', 9.5)
                pdf.set_text_color(180, 83, 84) # Terracotta for option index
                pdf.write(5.5, f" Opcion {idx}: ")
                pdf.set_font('helvetica', '', 9.5)
                pdf.set_text_color(9, 9, 12)
                pdf.write(5.5, f"\"{c['label']}\"\n")

                # Choice consequences (Next scene and effects)
                pdf.set_font('helvetica', 'I', 8.5)
                pdf.set_text_color(123, 152, 171) # Sky Blue
                effects_str = ", ".join([f"{k}: {v}" for k, v in c['effects'].items()])
                eff_part = f" | Efectos en stats: [{effects_str}]" if effects_str else ""
                pdf.cell(0, 5, f"     -> Siguiente escena: '{c['next']}'{eff_part}", 0, 1, 'L')
                pdf.ln(2)

    # Save PDF
    output_filename = 'public/Guion_Narrativo_Malvinas.pdf'
    os.makedirs(os.path.dirname(output_filename), exist_ok=True)
    pdf.output(output_filename)

    print(f"\nPDF generado exitosamente en: {output_filename}")

    # Generate Markdown version as well
    md_filename = 'Guion_Narrativo_Malvinas.md'
    with open(md_filename, 'w', encoding='utf-8') as f:
        f.write('# Proyecto Narrativo Transmedia: Malvinas en Primera Persona\n')
        f.write('## Guión Narrativo Completo y Estructura del Juego Serio\n\n')
        f.write('Este documento contiene todas las escenas, opciones, bifurcaciones de decisiones e hitos del juego interactivo "Malvinas en primera persona", desarrollado como recurso didáctico para la materia **Fundamentos de la Computación**.\n\n')
        f.write('---\n\n')

        for s in parsed_scenes:
            f.write(f"### Escena: {s['key']} ({s['title']})\n")
            f.write(f"- **Capítulo:** {s['chapter']}\n")
            f.write(f"- **Día:** {s['day']}\n\n")

            if s['info']:
                f.write(f"> **Contexto Histórico:**\n> {s['info']}\n\n")

            f.write(f"#### Texto Narrativo:\n{s['text']}\n\n")

            if s['memories']:
                f.write("#### Memorias Narrativas:\n")
                for m in s['memories']:
                    f.write(f"- *Si elegiste* `{m['condition']}`: \"{m['text']}\"\n")
                f.write("\n")

            if s['choices']:
                f.write("#### Decisiones:\n")
                for idx, c in enumerate(s['choices'], 1):
                    eff_part = f" *(Efectos: {c['effects']})*" if c['effects'] else ""
                    f.write(f"{idx}. \"{c['label']}\" → Salta a `{c['next']}`{eff_part}\n")
            
            f.write('\n---\n\n')

    print(f"Markdown generado exitosamente en: {md_filename}")

if __name__ == '__main__':
    main()
