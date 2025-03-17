import sys
from PyQt6.QtWidgets import QApplication, QWidget, QPushButton, QVBoxLayout, QFileDialog, QLabel
from xml_handler import carregar_xml, editar_xml, salvar_xml
from danfe_generator import gerar_danfe

class NFeEditor(QWidget):
    def __init__(self):
        super().__init__()
        self.initUI()

    def initUI(self):
        self.setWindowTitle("Editor de NFe e DANFE")
        self.setGeometry(100, 100, 400, 300)

        self.label = QLabel("Nenhum arquivo carregado", self)
        self.btnCarregar = QPushButton("Carregar XML", self)
        self.btnEditar = QPushButton("Editar XML", self)
        self.btnGerarDANFE = QPushButton("Gerar DANFE", self)

        self.btnCarregar.clicked.connect(self.carregar_xml)
        self.btnEditar.clicked.connect(self.editar_xml)
        self.btnGerarDANFE.clicked.connect(self.gerar_danfe)

        layout = QVBoxLayout()
        layout.addWidget(self.label)
        layout.addWidget(self.btnCarregar)
        layout.addWidget(self.btnEditar)
        layout.addWidget(self.btnGerarDANFE)

        self.setLayout(layout)

        self.arquivo_xml = None
        self.tree = None

    def carregar_xml(self):
        arquivo, _ = QFileDialog.getOpenFileName(self, "Selecionar XML", "", "Arquivos XML (*.xml)")
        if arquivo:
            self.tree = carregar_xml(arquivo)
            if self.tree:
                self.arquivo_xml = arquivo
                self.label.setText(f"XML carregado: {arquivo}")

    def editar_xml(self):
        if self.tree:
            editar_xml(self.tree, "dest/xNome", "Novo Destinatário")
            salvar_xml(self.tree, self.arquivo_xml)
            self.label.setText("XML atualizado!")
        else:
            self.label.setText("Carregue um XML primeiro!")

    def gerar_danfe(self):
        if self.tree:
            caminho_saida, _ = QFileDialog.getSaveFileName(self, "Salvar DANFE", "", "PDF (*.pdf)")
            if caminho_saida:
                gerar_danfe(self.tree, caminho_saida)
                self.label.setText("DANFE gerado com sucesso!")
        else:
            self.label.setText("Carregue um XML primeiro!")

if __name__ == "__main__":
    app = QApplication(sys.argv)
    editor = NFeEditor()
    editor.show()
    sys.exit(app.exec())
