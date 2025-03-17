from reportlab.lib.pagesizes import letter
from reportlab.pdfgen import canvas

def gerar_danfe(xml_tree, caminho_saida):
    """Gera um PDF simples da DANFE a partir do XML da NFe."""
    root = xml_tree.getroot()
    
    # Pegando informações básicas
    emitente = root.find(".//emit/xNome").text
    destinatario = root.find(".//dest/xNome").text
    valor_total = root.find(".//total/ICMSTot/vNF").text
    chave_nfe = root.find(".//infNFe").attrib["Id"].replace("NFe", "")

    c = canvas.Canvas(caminho_saida, pagesize=letter)
    
    # Criando a DANFE básica
    c.drawString(100, 750, f"Emitente: {emitente}")
    c.drawString(100, 730, f"Destinatário: {destinatario}")
    c.drawString(100, 710, f"Valor Total: R$ {valor_total}")
    c.drawString(100, 690, f"Chave da NFe: {chave_nfe}")

    c.save()
