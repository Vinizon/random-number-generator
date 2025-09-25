
# n8n-nodes-random

Este projeto é um nó para o [n8n](https://n8n.io) que permite gerar números verdadeiramente aleatórios usando o serviço [random.org](https://random.org).

## Instalação das dependências

```powershell
npm install
```

## Executar o serviço localmente (usando Docker)

Certifique-se de ter o Docker instalado. Para subir o ambiente completo (n8n + PostgreSQL), execute:

```powershell
docker-compose up
```

O serviço n8n estará disponível em [http://localhost:5678](http://localhost:5678).

## Configuração do ambiente

- As variáveis de ambiente principais já estão definidas no `docker-compose.yml` (banco de dados, host, timezone, etc).
- Caso queira customizar, crie um arquivo `.env` na raiz do projeto e adicione suas variáveis.
- O banco de dados PostgreSQL será inicializado automaticamente com usuário, senha e banco padrão (`n8n`).

## Executar os testes

Se houver testes definidos, utilize:

```powershell
npm test
```

Ou, para rodar scripts específicos, consulte o `package.json` (exemplo: `npm run build` para compilar TypeScript).

## Informações adicionais

- O nó utiliza o pacote `n8n-workflow` como dependência peer.
- Para empacotar o nó para uso no n8n, utilize:
  ```powershell
  npm run pack
  ```
- Os arquivos TypeScript são compilados para a pasta `dist/`.
- Para adicionar o nó ao n8n, siga a [documentação oficial de community nodes](https://docs.n8n.io/integrations/community-nodes/installation/).
