# LabDesSoft
![GitHub repo size](https://img.shields.io/github/repo-size/yG2y/lab-des-soft?style=for-the-badge)
![GitHub contributors](https://img.shields.io/github/contributors/yG2y/lab-des-soft?style=for-the-badge)
![GitHub last commit](https://img.shields.io/github/last-commit/yG2y/lab-des-soft?style=for-the-badge)
> Um sistema de gerenciamento de tarefas que permite realizar operações CRUD, considerando prazos, status e prioridades.

# ⚠️ **Atenção**: Ao tentar acessar a API, é necessário aguardar 2 minutos pela inicialização do Render.

### Ajustes e melhorias

As próximas atualizações estão focadas nas seguintes melhorias:
- [ ] Deploy da interface de usuário
- [ ] Correção de bugs críticos de usabilidade

# Código do Projeto

## 💻 Pré-requisitos para uso local

Antes de começar, certifique-se de ter as seguintes ferramentas instaladas:
- [Node.js](https://nodejs.org/) (versão mais recente)
- [JDK 21](https://www.oracle.com/java/technologies/javase/jdk21-archive-downloads.html)
- Um sistema operacional compatível: Windows, Linux ou macOS.

## 🚀 Instalando <LabDesSoft> no Front End

Para instalar o `LabDesSoft` no Front End, siga as etapas abaixo:

1. Acesse a pasta do front-end:
   ```bash
   cd lab-des-soft/front-end
   ```

2. Instale as dependências:
   ```bash
   npm install
   ```

## ☕ Usando <LabDesSoft> no Front End

Para usar <LabDesSoft>, siga estas etapas: `lab-des-soft\front-end\src\api.js`

1. Comente a linha:
   ```javascript
   // https://lab-des-soft.onrender.com/api/task
   ```

2. Descomente a linha:
   ```javascript
   http://localhost:8088/api/task
   ```


## ☕ Usando <LabDesSoft> no Back End

Para iniciar o back-end do projeto Java, siga estas etapas:

1. Acesse o diretório do projeto Java:
   ```bash
   cd lab-des-soft/projeto01/projeto01/src/main/java/com/labdessoft/projeto01
   ```

2. Inicie a aplicação executando o arquivo principal:
   ```bash
   Projeto01Application.java
   ```

## 📜 Mensagens de Commit Semânticas

Utilizar commits semânticos ajuda a manter um histórico de mudanças mais claro e organizado, facilitando a colaboração e o entendimento da evolução do projeto.

Formato básico: `<tipo>(<escopo>): <assunto>`

`<escopo>` é opcional!

Mais Exemplos:

- `feat`: (nova funcionalidade para o usuário, não uma nova funcionalidade para o script de build)
- `fix`: (correção de um bug para o usuário, não uma correção em um script de build)
- `docs`: (alterações na documentação)
- `style`: (formatação, ausência de ponto e vírgula, etc.; sem mudanças no código de produção)
- `refactor`: (refatoração de código de produção, ex.: renomear uma variável)
- `test`: (adicionando testes que faltam, refatoração de testes; sem mudanças no código de produção)
- `chore`: (atualização de tarefas do grunt, etc.; sem mudanças no código de produção)

  [Leia mais sobre commits semânticos](https://www.conventionalcommits.org/)

## *Commits que fecham issues*

- Existem algumas palavras que podemos utilizar na mensagem de commit, para fechar uma issue. Precisamos referenciar também, o ID da issue (aquele número que aparece na URL quando você acessa a issue). E essas palavras são:
```
fix, fixes, fixed, close, closes, closed, resolve, resolves, resolved
```

Exemplo:
```
git commit -m "Fix error on issue #32"
```
<br>

Referências:

- https://www.conventionalcommits.org/
- https://seesparkbox.com/foundry/semantic_commit_messages
- http://karma-runner.github.io/1.0/dev/git-commit-msg.html
- https://dev.to/jhonywalkeer/hacks-do-github-commits-que-fecham-issues-2aj8


## 🤝 Colaboradores

<table>
  <tr>
    <td align="center">
      <a href="https://github.com/yG2y" title="Perfil Guilherme G2">
        <img src="https://avatars.githubusercontent.com/u/89223673?v=4" width="100px;" alt="Foto do Guilherme G2 no GitHub"/><br>
        <sub>
          <b>Guilherme G2</b>
        </sub>
      </a>
    </td>
  </tr>
</table>

## 📝 Licença

Esse projeto está sob licença. Veja o arquivo [LICENÇA](../LICENSE) para mais detalhes.
