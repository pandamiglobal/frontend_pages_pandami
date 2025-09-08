---
applyTo: '**'
---
Provide project context and coding guidelines that AI should follow when generating code, answering questions, or reviewing changes.


Este projeto é uma landing page para a Pandami, uma plataforma de visagismo online. A página é construída usando Next.js 15 e TailwindCSS 4.

## Configuração da Importação de fontes

Sempre que for o caso de alterar a configuração fonte, referencie #file:globals.css #file:layout.tsx #file:tailwind.config.js as fontes são referenciadas nesses arquivos, assegure congruência na hora de importar para evitar erros de build por má configuração.

## Estilização de páginas

- Sempre prefira TailwindCSS para estilização, evite CSS puro.
- Na hora de estilizar background, foreground e elementos de cores primárias, ou mesmo gradientes, dê preferência ao uso das variáveis CSS da TailwindCSS em "#file:@/styles/globals.css".
- Utilize classes utilitárias do TailwindCSS para manter a consistência visual e facilitar a manutenção do código.

## Quando criando novas seções
- Verifique a estilização e construção semântica das seções já existentes para manter a consistência visual e estrutural em todo o projeto.
- Considere a responsividade desde o início, utilizando as classes utilitárias do TailwindCSS para garantir que a seção funcione bem em diferentes tamanhos de tela.
- Sempre utilize a tag <section> para definir novas seções na página.
- Sempre defina um id para a seção, que deve ser o mesmo nome da seção em lowercase e sem espaços. Exemplo: id="pricing" para a seção de preços.
- Sempre utilize a tag <Container> para envolver o conteúdo da seção, garantindo alinhamento e espaçamento consistentes.
- Sempre utilize títulos descritivos e claros para cada seção, utilizando tags <h2> ou <h3> conforme apropriado.
- Dê preferência às variáveis CSS definidas em "#file:@/styles/globals.css" para cores.
- Utilize classes utilitárias do TailwindCSS para estilizar a seção, garantindo que a aparência esteja alinhada com o design geral da página.