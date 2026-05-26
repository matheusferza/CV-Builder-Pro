# CV Builder Pro

Sistema web SaaS para criação, importação, edição e exportação de currículos profissionais, modernos e ATS-friendly.

![CV Builder Pro](public/brand/logo-cv-builder-pro.png)

## Visão Geral

O CV Builder Pro transforma a criação de currículos em uma experiência completa de produto: área pública, autenticação, dashboard privado, gerenciamento de múltiplos currículos, templates premium, personalização visual, importação de arquivos e exportação em PDF.

O projeto foi construído como uma aplicação React escalável, com separação entre landing page pública e área autenticada.

## Funcionalidades

- Área pública com Home, Sobre, Planos, Contato, Login e Cadastro
- Autenticação local com LocalStorage
- Rotas protegidas com `ProtectedRoute`
- Dashboard privado com métricas, atalhos e currículos recentes
- Gerenciamento de múltiplos currículos
- Criar, editar, duplicar, favoritar e excluir currículos
- Editor com formulário e preview A4 em tempo real
- Templates profissionais:
  - ATS Clean
  - Modern Dev
  - Sidebar
  - Dark Mode
  - Corporate
  - Minimal
  - Creative
  - Dev Premium
- Personalização de tema:
  - Cores
  - Fonte
  - Tamanho da fonte
  - Espaçamento
  - Estilo de títulos
  - Estilo de seções
  - Bordas
  - Ícones
  - Ordem das seções com drag and drop
- Exportação de PDF fiel ao preview
- Importação de currículos em PDF, DOCX, JPG, JPEG e PNG
- OCR para imagens com Tesseract.js
- Extração de PDF com PDF.js
- Extração de DOCX com Mammoth
- Análise inteligente de currículo com fallback local
- Integração opcional com OpenAI Responses API para estruturar dados importados
- Importar e exportar currículos em JSON
- Design responsivo com experiência adaptada para desktop e mobile

## Tecnologias

- React
- TypeScript
- Vite
- Tailwind CSS
- React Router
- jsPDF
- html2canvas
- PDF.js
- Mammoth
- Tesseract.js
- Lucide React
- LocalStorage

## Estrutura

```txt
src/
  components/
    auth/
    layout/
    resume/
    ui/
  context/
  data/
  pages/
    private/
    public/
  routes/
  services/
  templates/
  types/
```

## Rotas

### Públicas

- `/`
- `/sobre`
- `/planos`
- `/contato`
- `/login`
- `/register`

### Privadas

- `/dashboard`
- `/curriculos`
- `/curriculos/novo`
- `/curriculos/editar/:id`
- `/templates`
- `/configuracoes`

Também existem aliases em inglês para algumas rotas:

- `/resumes`
- `/resumes/new`
- `/resumes/:id/edit`
- `/settings`

## Como Rodar

```bash
npm install
npm run dev
```

Aplicação local:

```txt
http://localhost:5173
```

## Build

```bash
npm run build
```

Preview do build:

```bash
npm run preview
```

## Login de Teste

A autenticação atual é local. Crie uma conta em `/register` e use o mesmo e-mail/senha em `/login`.

Exemplo:

```txt
Nome: Usuário Teste
E-mail: teste@teste.com
Senha: 123456
```

## IA

O sistema funciona sem chave externa usando fallback local.

Para testar análise com IA real, informe uma OpenAI API Key em:

```txt
/configuracoes
```

Em produção, essa chave deve ficar em um backend seguro. O uso no navegador é apenas para protótipo local.

## Importação de Currículos

Na rota `/curriculos/novo`, o usuário pode:

- começar em branco
- importar PDF
- importar DOCX
- importar JPG, JPEG ou PNG

Após a importação, o sistema tenta preencher automaticamente:

- dados pessoais
- contatos
- resumo
- experiências
- projetos
- formação
- habilidades

## Roadmap

- Firebase Authentication
- Banco de dados real por usuário
- Login social
- Planos pagos e assinatura
- Histórico de versões
- IA para melhorar descrições de experiências
- IA para adaptar currículo por vaga
- Importação via LinkedIn
- Publicação de currículo online

## Repositório

[github.com/matheusferza/CV-Builder-Pro](https://github.com/matheusferza/CV-Builder-Pro)
