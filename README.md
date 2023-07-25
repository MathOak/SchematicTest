# Documentação: Estrutura de JSON para Informações de Perfuração

Descrição de como configurar e interpretar o objeto JSON que armazena as informações sobre o esquemático de perfuração. A estrutura JSON deve conter um valor de profundidade total de perfuração (representado por `drillDeph`) e uma lista de partes da perfuração (`parts`). Cada parte contém uma chave única (`part`), juntamente com valores para origem e profundidade.

## Exemplo de JSON

Aqui está um exemplo de como esse objeto JSON é estruturado:

```json
{
  "drillDeph": 2000,
  "parts": [
    {
      "part": "sapata",
      "origin": 0,
      "deph": 700
    },
    {
      "part": "packer",
      "origin": 1700,
      "deph": 1800
    }
  ]
}
```

## Descrição dos Campos

Os campos no JSON têm os seguintes significados:

- `drillDeph` (float): Representa a profundidade total da perfuração em metros. Por exemplo, no JSON acima, a perfuração total é de 2000 metros, ou seja, 2 quilômetros.

- `parts` (array): Uma lista de objetos, onde cada objeto representa uma parte específica da perfuração. Cada objeto na lista `parts` deve conter os seguintes campos:
  - `part` (string): O nome da parte específica em uso.
  - `origin` (float): A profundidade de origem da parte em metros, medida a partir da superfície.
  - `deph` (float): A profundidade final da parte em metros, ou seja, a profundidade na qual a parte termina.

## Partes Disponíveis

As seguintes chaves são permitidas para o campo `part`:

- `sapata`: Sapata com cimentação
- `fluid`: Líquido interno do poço
- `open`: Canhoneiro
- `cross_over`: Cross Over (Coluna)
- `nipple`: Nipple (Coluna)
- `packer`: Packer (Coluna)
- `shear_out`: Shear Out (Coluna)

Ao inserir esses nomes, é importante que a ortografia esteja correta e que eles sejam escritos exatamente como mostrado acima.

## Regras Gerais

- O objeto JSON deve sempre conter um campo `drillDeph` e um campo `parts`.
- O campo `parts` deve ser uma lista contendo pelo menos um objeto.
- Cada objeto dentro da lista `parts` deve conter as chaves `part`, `origin` e `deph`.

Por favor, informe-me se há outros detalhes que você gostaria de adicionar ou alterar.