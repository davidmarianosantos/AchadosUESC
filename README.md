
# Sistema de Busca de Objetos Perdidos e Encontrados

Este projeto é uma interface web desenvolvida em **React** para a busca e visualização de objetos perdidos e encontrados. Ele permite que usuários filtrem objetos por nome, tipo, categoria, localização, período e status, e oferece uma visualização detalhada de cada item.

---

## 🛠 Funcionalidades

- **Busca por nome do objeto** em tempo real.
- **Filtros avançados**:
  - Tipo de registro (Todos, Encontrados, Perdidos)
  - Categoria (Eletrônicos, Documentos, Materiais acadêmicos, Acessórios, Roupas, Outros)
  - Local
  - Período (Data inicial e final)
  - Status (Em aberto, Em processo de devolução, Devolvido)
- **Limpar filtros** com um clique.
- **Exibição de objetos correspondentes** à busca e filtros aplicados.
- **Indicação de sugestões para o usuário** com badge "Sugestão para você".
- **Mensagem de alerta** caso nenhum objeto seja encontrado.
- **Navegação para detalhes do objeto** ao clicar no botão "Ver detalhes".

---

## ⚡ Tecnologias Utilizadas

- React + TypeScript
- Tailwind CSS
- Lucide Icons
- Componentes reutilizáveis: `Card`, `Badge`, `Input`, `Header`

---

## 📁 Estrutura do Projeto

```
src/
├── components/
│   ├── Header.tsx
│   ├── BuscarObjetos.tsx
│   └── ui/
│       ├── Card.tsx
│       ├── Badge.tsx
│       ├── Input.tsx
│       └── ...
├── App.tsx
├── index.tsx
└── ...
```

- `BuscarObjetos.tsx`: Tela principal de busca e filtros.
- `Header.tsx`: Cabeçalho com informações do usuário e navegação.
- `ui/`: Componentes reutilizáveis da interface (cards, badges, inputs).

---

## 🚀 Como Executar

1. Clone o repositório:

```bash
git clone <URL_DO_REPOSITORIO>
```

2. Instale as dependências:

```bash
npm install
# ou
yarn install
```

3. Inicie o servidor de desenvolvimento:

```bash
npm start
# ou
yarn start
```

4. Abra [http://localhost:3000](http://localhost:3000) no navegador.

---

## 🎯 Uso

1. Digite o nome do objeto no campo de busca.
2. Selecione os filtros desejados na barra lateral.
3. Clique em **Limpar filtros** para resetar todos os filtros.
4. Clique em **Ver detalhes** para acessar a tela de detalhes do objeto.

Exemplo de busca:

```text
Digite "carteira" → objetos correspondentes aparecem
Filtro de Categoria: Acessórios → apenas objetos desta categoria
Filtro de Status: Em aberto → apenas objetos ainda não devolvidos
```

Se nenhum objeto corresponder aos critérios, a aplicação exibirá uma **mensagem indicando que nenhum item foi encontrado**.

---

## 💡 Observações

- O projeto atualmente utiliza **dados mockados**, que podem ser substituídos por uma API real no futuro.
- Datas devem ser informadas no formato **YYYY-MM-DD** para o correto funcionamento dos filtros.
- Sugestões de correspondência aparecem como um **badge azul** com texto "Sugestão para você".

---

## 🤝 Contribuição

Contribuições são bem-vindas! Para contribuir:

1. Faça um fork do repositório.
2. Crie uma branch para sua feature:

```bash
git checkout -b feature/nome-da-feature
```

3. Faça commit das suas alterações:

```bash
git commit -m "Descrição da feature"
```

4. Envie para o repositório:

```bash
git push origin feature/nome-da-feature
```

5. Abra um Pull Request.

---

## 📝 Licença

Este projeto é licenciado sob a [MIT License](LICENSE).

---

## 📸 Exemplo de Tela

```
+------------------------------------------------------+
| Header (usuário: João Silva)                         |
+------------------------------------------------------+
| [ 🔍 Buscar objeto ]  [Filtros laterais]           |
| --------------------------------------------------- |
| Lista de objetos:                                   |
|  - Carteira de couro preta (Sugestão para você)    |
|  - Mochila azul marinho                             |
|  - Caderno de Cálculo                               |
|  - Fone de ouvido Bluetooth                          |
|  ...                                                |
+------------------------------------------------------+
```

```
Filtros:
- Tipo: Todos / Encontrados / Perdidos
- Categoria: Eletrônicos, Documentos, Materiais acadêmicos, Acessórios, Roupas, Outros
- Local: Biblioteca Central, Reitoria, CEU, etc.
- Período: Data inicial / Data final
- Status: Em aberto, Em processo de devolução, Devolvido
```

