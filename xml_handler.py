import lxml.etree as ET

def carregar_xml(caminho_arquivo):
    """Carrega um arquivo XML e retorna o elemento raiz."""
    try:
        tree = ET.parse(caminho_arquivo)
        return tree
    except Exception as e:
        print(f"Erro ao carregar XML: {e}")
        return None

def editar_xml(tree, tag, novo_valor):
    """Edita o valor de uma tag específica no XML."""
    root = tree.getroot()
    elemento = root.find(f".//{tag}")
    
    if elemento is not None:
        elemento.text = novo_valor
        return True
    return False

def salvar_xml(tree, caminho_saida):
    """Salva as alterações no XML."""
    tree.write(caminho_saida, pretty_print=True, xml_declaration=True, encoding="utf-8")
