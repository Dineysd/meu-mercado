# 🛒 Meu Mercado v2.0

**Lista de Compras Inteligente** — PWA para gerenciar suas compras de supermercado.

## ✅ Funcionalidades

- 🛒 **Lista de compras** por categoria com marcação de itens
- ♻️ **Reutiliza a última compra** ao criar nova lista
- 📷 **Importação via QR Code** do cupom fiscal (NFC-e)
- 📋 **Histórico de compras** com detalhes por item
- 📊 **Comparação de preços** ao longo do tempo
- 📦 **Catálogo** com 70+ produtos pré-cadastrados dos cupons reais
- 📱 **PWA instalável** no celular (funciona offline)
- 🔒 **Privacidade total** — dados ficam só no seu dispositivo

## 📁 Estrutura de Arquivos

```
meu-mercado/
├── index.html                       ← App completo (HTML + CSS + JS)
├── manifest.json                    ← Configuração PWA
├── sw.js                            ← Service Worker (cache offline)
├── netlify.toml                     ← Configuração de deploy
├── icon-192.png                     ← Ícone do app
├── icon-512.png                     ← Ícone splash screen
└── netlify/
    └── functions/
        └── nfce-proxy.js            ← Proxy serverless para NFC-e
```

## 🚀 Deploy no Netlify

### Opção A — Drag & Drop (mais simples)

1. Acesse https://app.netlify.com e faça login
2. Vá em **"Add new site" → "Deploy manually"**
3. **Arraste a pasta `meu-mercado`** para a área pontilhada
4. Aguarde ~10 segundos
5. Seu app estará em: `https://[nome-aleatorio].netlify.app`

### Opção B — GitHub (recomendado para atualizações)

```bash
git init
git add .
git commit -m "Meu Mercado v2.0"
git remote add origin https://github.com/SEU-USUARIO/meu-mercado
git push -u origin main
```

No Netlify:
- **"Add new site" → "Import an existing project"**
- Conecte ao GitHub e selecione o repositório
- Build command: *(deixar vazio)*
- Publish directory: `.`
- Functions directory: `netlify/functions`
- Clique **"Deploy site"**

## 📱 Como Instalar no Celular

1. Acesse o link do app no Chrome ou Safari
2. Aguarde o banner **"Instalar no celular"** aparecer
3. Toque nele ou use o menu do browser → "Adicionar à tela inicial"
4. O app aparece como app nativo!

## 🔧 Testando a Função NFC-e

Após o deploy, teste acessando:
```
https://seu-site.netlify.app/api/nfce-proxy?url=https://www.fazenda.pr.gov.br/nfce/qrcode?p=...
```

## 📊 Limites do Plano Gratuito Netlify

| Recurso | Limite |
|---------|--------|
| Requisições/mês | 125.000 |
| Tempo por requisição | 10s |
| Custo | R$ 0,00 |

## 🔒 Privacidade

Todos os dados ficam **apenas no seu dispositivo** (IndexedDB do browser).
Nenhuma informação pessoal é enviada a servidores.
A única conexão externa é para importar a nota fiscal pelo QR Code.

---
*Desenvolvido para uso pessoal · v2.0 · Março 2026*
