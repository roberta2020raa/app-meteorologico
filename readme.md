#App Tempo V1

O App Tempo consulta o clima atual de uma cidade e apresenta os dados em uma interface em português do Brasil. O navegador consulta uma API local em Express, que usa a chave da OpenWeather no servidor.

## Funcionalidades

- Busca por nome da cidade, com temperatura em °C, umidade e descrição do tempo.
- Exibição do horário local da cidade no momento da consulta e das temperaturas mínima e máxima retornadas pela OpenWeather para as condições atuais.
- Cenários e ícones que variam conforme a condição meteorológica e o período do dia, com um personagem animado que troca de roupa conforme o clima.
- Mensagens na interface para busca vazia, cidade desconhecida e falha na consulta.

## Tecnologias

| Camada | Tecnologias |
| --- | --- |
| Interface | HTML, CSS e JavaScript com módulos ES. Usa Font Awesome 7.3.0 e a fonte Ubuntu. |
| API | Node.js, Express 5.2.1 e CORS 2.8.6. |
| Dados meteorológicos | API Current Weather Data da OpenWeather, com unidades métricas e descrição em português do Brasil. |
| Desenvolvimento | npm e Nodemon 3.1.14. O pacote dotenv 17.4.2 está no manifesto, e o servidor carrega o `.env` com a API nativa do Node.js. |

As versões das dependências npm acima são as registradas no `package-lock.json`.

## Pré-requisitos

- Git, Node.js 20.12 ou superior e npm. Prefira uma versão LTS suportada. O mínimo decorre do uso de [`process.loadEnvFile()`](https://nodejs.org/download/release/v20.17.0/docs/api/process.html#processloadenvfilepath).
- Navegador moderno e um servidor estático local. O passo a passo usa o VS Code com a extensão Live Server.
- Acesso à internet e uma [chave da OpenWeather](https://home.openweathermap.org/api_keys) habilitada para consultar o clima atual.

## Instalação e execução

Clone o repositório e instale as dependências a partir do arquivo de lock.

```bash
git clone https://github.com/roberta2020raa/app-meteorologico.git
cd app-meteorologico
npm ci
```

Crie um arquivo chamado `.env` na raiz do projeto, ao lado de `package.json`, e adicione esta linha:

```dotenv
OPENWEATHER_API_KEY=sua_chave_aqui
```

Substitua `sua_chave_aqui` pela sua chave da OpenWeather apenas no arquivo `.env`. O Git ignora esse arquivo.

Inicie a API a partir da raiz do projeto.

```bash
npm start
```

Para reiniciar a API automaticamente durante a edição, use `npm run dev`.

Com a API rodando em `http://localhost:3000`, abra a pasta do projeto no VS Code. Clique com o botão direito em `index.html`, escolha **Open with Live Server** e acesse [http://127.0.0.1:5500/](http://127.0.0.1:5500/). Use esse endereço exato, pois é a origem permitida pelo CORS da API.

## Exemplos de uso

Na interface, digite **São Paulo** e clique na lupa. O cartão exibe o clima atual da cidade. Para testar o tratamento de erros, faça a busca com o campo vazio e depois com um nome de cidade inexistente.

### API local

`GET /clima?cidade=<nome>` recebe o nome da cidade no parâmetro obrigatório `cidade`. O exemplo usa o curl para codificar espaços na URL. No PowerShell, use `curl.exe` no lugar de `curl`.

```bash
curl -i -G "http://localhost:3000/clima" --data-urlencode "cidade=Rio de Janeiro"
```

Exemplo ilustrativo de resposta `200 OK`. Os valores variam a cada consulta.

```json
{
  "cidade": "Rio de Janeiro",
  "temperatura": 27.4,
  "umidade": 72,
  "condição": "Nublado",
  "ehDia": true,
  "timezone": -10800,
  "descricao": "nublado",
  "temperaturaMinima": 25.8,
  "temperaturaMaxima": 28.1
}
```

`timezone` é o deslocamento em segundos em relação ao UTC. `ehDia` indica se o horário dos dados meteorológicos está entre o nascer e o pôr do sol na cidade.

| Status | Quando ocorre | Corpo da resposta |
| --- | --- | --- |
| `400` | Parâmetro ausente ou recebido em formato diferente de texto | `"Valor invalido!"` |
| `400` | Parâmetro vazio ou composto apenas por espaços | `{"erro":"Cidade não informada"}` |
| `404` | Cidade não encontrada pela OpenWeather | `{"erro":"Cidade não encontrada"}` |
| `502` | Outra falha na consulta à OpenWeather | `{"erro":"Não foi possível consultar o clima"}` |

## Estrutura do projeto

```text
app-meteorologico/
├── assets/
│   ├── dia/                    # Cenários diurnos
│   ├── noite/                  # Cenários noturnos
│   └── menino/                 # Imagens do personagem
├── backend/
│   ├── server.js               # Inicialização do Express e configuração de CORS
│   ├── clima.js                # Validação e resposta da rota /clima
│   └── services/
│       ├── interpretarClimaService.js
│       └── openWeatherService.js
├── api.js                      # Consulta do navegador à API local
├── index.html                  # Página do aplicativo
├── index.js                    # Busca e atualização da interface
├── style.css                   # Estilos, cenários e animações
├── visual.js                   # Seleção de cenários e roupas
├── package.json
└── package-lock.json
```

## Capturas de tela

O repositório ainda não inclui capturas da interface. Os [cenários diurnos](assets/dia/) e [noturnos](assets/noite/) mostram as ilustrações usadas no aplicativo.

## Solução de problemas

| Sintoma | O que verificar |
| --- | --- |
| `process.loadEnvFile is not a function` | Confira a versão com `node --version`. Use Node.js 20.12 ou superior dentro de uma linha suportada. |
| `ENOENT` ao iniciar a API | Confira se o `.env` existe na raiz e execute `npm start` a partir dessa pasta. |
| `EADDRINUSE` | A porta `3000` está ocupada. Encerre o processo que a utiliza e inicie a API novamente. |
| O terminal consulta a API, mas o navegador acusa CORS | Abra a interface em `http://127.0.0.1:5500`. `localhost:5500` e outras portas são origens diferentes. |
| Conexão recusada ou falha ao buscar no navegador | Confira se a API está em execução na porta `3000` e repita a consulta com o exemplo de curl. |
| A API retorna `502` | Confira a conexão com a internet, o preenchimento de `OPENWEATHER_API_KEY` e se a chave está ativa. Reinicie a API após editar o `.env`. |
| A API retorna `404` com a mensagem de cidade não encontrada | Revise a grafia. Se houver cidades homônimas, tente incluir o código do país, como `São Paulo,BR`. |

## Como contribuir

1. Abra uma [issue](https://github.com/roberta2020raa/app-meteorologico/issues) com a proposta ou com os passos para reproduzir o erro. Inclua o resultado esperado e o observado.
2. Faça um fork, clone sua cópia e crie uma branch para a alteração, por exemplo `git switch -c melhoria/minha-alteracao`.
3. Instale as dependências e faça a validação manual. O projeto usa os scripts `start` e `dev` e ainda não define `npm test`. Confira uma consulta válida, uma busca vazia e uma cidade inexistente. Verifique a interface e os códigos HTTP correspondentes.
4. Faça o commit da alteração, envie a branch para seu fork e abra um pull request para `master`. Descreva o que mudou e como você verificou.

## Licença

O `package.json` declara MIT. O repositório ainda não inclui um arquivo `LICENSE` com o texto da licença. Antes de reutilizar ou redistribuir o código, confirme os termos aplicáveis com a responsável pelo projeto.
