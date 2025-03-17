# Vitrine de Produtos Responsiva

## Descrição
A vitrine de produtos é um componente responsivo que consome uma API e exibe os produtos com detalhes como imagem, nome, variações, e preço. A vitrine é interativa e possui funcionalidade de troca de layout e exibição do número total de produtos.

## Funcionalidades
1. **Contador de Produtos**: Exibe o número total de produtos retornados pela API.
2. **Botão de Alteração de Layout**: Permite alternar entre layouts de visualização de produtos:
   - **Mobile**: 1 ou 2 produtos por linha.
   - **Desktop**: 4 ou 5 produtos por linha.
3. **Troca de Imagem das Variações**: Ao clicar em uma variação, a imagem principal do produto é alterada.
4. **Desconto Visível**: Caso o produto tenha um desconto, o preço original é exibido riscado e o preço com desconto é destacado.
5. **Botão de Comprar**: Embora não tenha ação associada, o botão de compra está presente.

## Tecnologias Usadas
- HTML5
- CSS3 (com media queries para responsividade)
- JavaScript (ES6+)
- jQuery (para manipulação de DOM e requisições)
- API: `desafio.xlow.com.br/search` para listar produtos e `desafio.xlow.com.br/search/:productid` para detalhes.
