# Análise de UX - Página de Resultados do Quiz
## Análise Detalhada da Página `/resultados`

**Data:** 2025-01-27  
**Página Analisada:** `src/app/(pages)/resultados/page.tsx`  
**Componente Renderizado:** `src/components/quiz/quiz-results.tsx`  
**URL:** `http://localhost:3000/resultados`  
**Contexto:** Direct Response Marketing - Página de conversão pós-quiz

---

## 📊 Resumo Executivo

Análise focada exclusivamente na **página de resultados** (`/resultados`). Esta página é o ponto final do funil do quiz e tem como objetivo converter visitantes em leads interessados na ferramenta. A análise avalia cada elemento visual, estrutural e de interação presente na página.

**Status Geral:** ⚠️ **Bom, mas com oportunidades de otimização**  
**Foco:** Análise 100% dedicada à página de resultados, sem referências a outras páginas do fluxo.

---

## 🎯 Contexto da Página de Resultados

### Estrutura da Página
A página `/resultados` é composta por:
- **Wrapper:** `<div data-no-header data-no-footer>` - Remove header/footer
- **Componente Principal:** `<QuizResults />` que renderiza todo o conteúdo visual
- **Layout:** Section com fundo padrão, container centralizado, card branco

### Objetivo da Página
- **Primário:** Converter visitantes que completaram o quiz em leads interessados na ferramenta
- **Secundário:** Educar sobre o problema e a solução através da copy
- **Terciário:** Estabelecer autoridade e confiança através do design

### Estado do Usuário ao Chegar
- **Fase:** Pós-engajamento (usuário completou quiz)
- **Estado mental:** Curioso, interessado, potencialmente pronto para ação
- **Expectativa:** Ver resultado personalizado do quiz (atualmente não há personalização baseada em `answers`)

---

## ✅ Pontos Fortes da Página de Resultados

### 1. **Estrutura Visual e Layout**
**Elementos Analisados:**
- ✅ **Background:** `bg-[#f7f7f7]` com padrão de grid (`bg-grid-pattern opacity-70`)
- ✅ **Container:** Centralizado com `max-w-4xl`, padding vertical `py-16`
- ✅ **Card Principal:** Branco (`bg-white`), sombra (`shadow-lg`), bordas arredondadas (`rounded-2xl`)
- ✅ **Padding Responsivo:** `p-8 md:p-12` - adequado para mobile e desktop
- ✅ **Min-height:** `min-h-screen` garante que conteúdo ocupe tela inteira

**Avaliação:** Layout limpo e focado, cria hierarquia visual clara

### 2. **Cabeçalho da Página (Icon + Title)**
**Elementos Analisados:**
- ✅ **Ícone:** Círculo gradiente (`bg-gradient-to-r from-[hsl(var(--primary-gradient-from))] to-[hsl(var(--primary-gradient-to))]`)
- ✅ **Ícone Search:** `h-8 w-8 text-white` - tamanho adequado
- ✅ **Título H1:** `text-3xl md:text-4xl font-semibold text-black` - hierarquia clara
- ✅ **Copy do Título:** "Seu salão tem um grande potencial de faturamento escondido" - focado em benefício
- ✅ **Espaçamento:** `mb-8` após título, `mb-6` após ícone

**Avaliação:** Headline persuasivo, visualmente destacado

### 3. **Corpo de Texto (3 Parágrafos)**
**Elementos Analisados:**
- ✅ **Parágrafo 1:** Foca em "confiar mais, indicar mais, aceitar cortes de maior valor"
- ✅ **Parágrafo 2:** Explica causa (falta de previsibilidade, diferenciação, comunicação)
- ✅ **Parágrafo 3:** Apresenta solução (tecnologia)
- ✅ **Destaques:** `<span className="font-semibold text-primary">` em palavras-chave
- ✅ **Tipografia:** `text-lg md:text-xl text-gray-700 leading-relaxed`
- ✅ **Espaçamento:** `mb-6` e `mb-8` entre parágrafos

**Avaliação:** Progressão lógica (problema → causa → solução), copy mantida original

### 4. **Grid de Benefícios (4 Cards)**
**Elementos Analisados:**
- ✅ **Layout:** `grid md:grid-cols-2 gap-2` - 2 colunas no desktop, 1 no mobile
- ✅ **Cards:** `bg-gray-50 rounded-xl p-4` - fundo cinza claro, padding adequado
- ✅ **Estrutura:** Flex horizontal (`flex items-start space-x-4`)
- ✅ **Ícones:** 4 ícones diferentes (Search, TrendingUp, Users, DollarSign)
- ✅ **Ícones Container:** `w-10 h-10 bg-primary/10 rounded-lg` - tamanho consistente
- ✅ **Texto:** `font-semibold text-gray-900` - legível e destacado
- ✅ **Benefícios Listados:**
  1. "Mostrar resultado ideal antes do corte"
  2. "Aumentar a confiança do cliente"
  3. "Reduzir retrabalho"
  4. "Aumentar ticket médio"

**Avaliação:** Benefícios claros e visuais, mas gap muito pequeno (`gap-2`)

### 5. **Seção CTA (Call-to-Action)**
**Elementos Analisados:**
- ✅ **Separador:** `border-t border-gray-200 pt-8` - linha divisória sutil
- ✅ **Link:** `<Link href="/">` - redireciona para homepage
- ✅ **Botão:** `PrimaryButton` com `size="lg"` e `w-full`
- ✅ **Ícone:** `ArrowRight` posicionado à direita (padrão)
- ✅ **Texto CTA:** "Quero ver a ferramenta que aumenta o faturamento dos salões"
- ✅ **Classes:** `px-8 py-4 text-lg` - tamanho grande e legível
- ✅ **Espaçamento:** `mb-6` após botão

**Avaliação:** CTA proeminente, mas destino não otimizado (`href="/"`)

### 6. **Design Responsivo**
**Breakpoints Analisados:**
- ✅ **Mobile:** Layout empilhado, padding reduzido (`p-8`)
- ✅ **Desktop (`md:`):** Grid 2 colunas, padding aumentado (`p-12`)
- ✅ **Texto:** Escala de `text-lg` para `text-xl` no desktop
- ✅ **Título:** Escala de `text-3xl` para `text-4xl` no desktop
- ✅ **Container:** `max-w-4xl` limita largura máxima

**Avaliação:** Mobile-first implementado corretamente

---

## ⚠️ Oportunidades de Melhoria (Priorizadas)

### 🔴 CRÍTICO - Impacto Alto na Conversão

#### 1. **Falta de Urgência/Escassez**
**Problema:** Nenhum elemento cria senso de urgência ou escassez  
**Impacto:** Reduz taxa de conversão imediata  
**Solução Sugerida:**
- Adicionar timer de oferta limitada (se aplicável)
- Mostrar número de salões que já usam a ferramenta
- Indicador de "vagas limitadas" ou "oferta especial"

**Nota:** Manter copy original, apenas adicionar elementos visuais de urgência

#### 2. **CTA Redireciona para Home (Não Otimizado)**
**Problema:** CTA leva para `/` (homepage) em vez de landing page específica  
**Impacto:** Usuário pode se perder ou não encontrar a oferta  
**Solução Sugerida:**
- Redirecionar para landing page específica da ferramenta
- Ou criar página de captura de lead dedicada
- Manter contexto do quiz (passar dados via query params)

**Código Atual:**
```tsx
<Link href="/">
  <PrimaryButton>...</PrimaryButton>
</Link>
```

#### 3. **Falta de Prova Social Imediata**
**Problema:** Nenhuma prova social visível na página de resultados  
**Impacto:** Reduz confiança e credibilidade  
**Solução Sugerida:**
- Adicionar depoimento breve acima ou abaixo do CTA
- Mostrar número de usuários/salões
- Logo de clientes ou certificações
- Avaliações/estrelas

**Nota:** Manter copy original, adicionar elementos de prova social visualmente

---

### 🟡 IMPORTANTE - Impacto Médio na Conversão

#### 4. **Falta de Feedback Visual de Conclusão do Quiz**
**Problema:** A página não comunica visualmente que o usuário completou o quiz  
**Impacto:** Usuário pode não sentir senso de realização ou confusão sobre onde está  
**Elementos Faltantes na Página:**
- Nenhum indicador de "Quiz Completo" ou "Resultados do Seu Quiz"
- Sem badge ou ícone de conclusão
- Sem mensagem de parabéns ou reconhecimento

**Solução Sugerida:**
- Adicionar badge discreto "Quiz Completo" acima do título
- Ou adicionar texto introdutório: "Baseado nas suas respostas:"
- Manter copy original, apenas adicionar contexto visual

#### 5. **Espaçamento Entre Seções Pode Ser Otimizado**
**Problema:** `mb-8` e `mb-10` podem criar muito espaço vertical  
**Impacto:** Usuário precisa rolar mais para ver o CTA  
**Solução Sugerida:**
- Reduzir espaçamento entre parágrafos (`mb-6` → `mb-4`)
- Manter `mb-10` apenas antes do CTA para criar separação visual

#### 6. **Falta de Opção de "Voltar" ou "Refazer Quiz" na Página**
**Problema:** A página não oferece controle ao usuário para voltar ou refazer o quiz  
**Impacto:** Viola heurística #3 (User Control and Freedom)  
**Análise do Código:**
- A página passa `onRestart={handleRestart}` para o componente
- Mas o componente `QuizResults` **não utiliza** a prop `onRestart`
- Usuário fica "preso" na página sem opção de saída além do CTA

**Solução Sugerida:**
- Implementar uso da prop `onRestart` no componente
- Adicionar link discreto "Refazer quiz" abaixo do CTA principal
- Ou botão secundário "Voltar ao início" no topo da página
- Manter visual discreto para não competir com CTA principal

#### 7. **Grid de Benefícios com Gap Muito Pequeno**
**Problema:** `gap-2` é muito pequeno, cards ficam muito próximos  
**Impacto:** Reduz legibilidade e hierarquia visual  
**Solução Sugerida:**
- Aumentar para `gap-4` ou `gap-6`
- Melhor separação visual entre benefícios

---

### 🟢 MELHORIAS - Impacto Baixo/Médio

#### 8. **Acessibilidade - Estrutura Semântica da Página**
**Problema:** Estrutura HTML não otimizada para leitores de tela  
**Análise da Estrutura Atual:**
```tsx
<section className="...">
  <Container>
    <div className="...">
      <div className="bg-white..."> {/* Card */}
        <div> {/* Icon and Title */}
          <h1>...</h1>
        </div>
        <div> {/* Main Result Text */}
          <p>...</p>
        </div>
        <div> {/* Benefits Grid */}
          <div>...</div> {/* 4 benefícios sem headings */}
        </div>
        <div> {/* CTA Section */}
          <Link><PrimaryButton>...</PrimaryButton></Link>
        </div>
      </div>
    </div>
  </Container>
</section>
```

**Problemas Identificados:**
- ❌ Falta `<main>` como landmark principal
- ❌ Benefícios não têm headings (h2 ou h3)
- ❌ Section sem `aria-label` descritivo
- ❌ Estrutura de divs aninhadas sem significado semântico

**Solução Sugerida:**
- Envolver conteúdo em `<main role="main">`
- Adicionar `aria-label="Resultados do quiz"` na section
- Converter benefícios em lista semântica ou adicionar h2/h3
- Melhorar navegação por teclado

#### 9. **Falta de Loading State**
**Problema:** Se houver delay no carregamento, não há feedback  
**Impacto:** Usuário pode pensar que a página travou  
**Solução Sugerida:**
- Adicionar skeleton loader durante carregamento
- Especialmente importante se houver dados dinâmicos

#### 10. **Ícone de Busca Pode Ser Mais Contextual**
**Problema:** Ícone de "Search" não representa claramente "resultado" ou "solução"  
**Impacto:** Pode confundir usuário  
**Solução Sugerida:**
- Considerar ícone de "TrendingUp", "CheckCircle", ou "Award"
- Ou manter Search mas adicionar tooltip/aria-label explicativo

#### 11. **Falta de Micro-interações**
**Problema:** Página estática, sem animações sutis  
**Impacto:** Menos engajamento e sensação de "modernidade"  
**Solução Sugerida:**
- Fade-in suave no card principal
- Hover states mais pronunciados nos cards de benefícios
- Animação no CTA ao aparecer

---

## 📐 Análise por Heurísticas de Nielsen

### ✅ 1. Visibility of System Status
**Status:** ⚠️ **Parcial**
- ✅ Página carrega e mostra conteúdo
- ❌ Falta indicador de que quiz foi completado
- ❌ Sem feedback de loading se houver delay

### ✅ 2. Match Between System and Real World
**Status:** ✅ **Bom**
- ✅ Linguagem natural e familiar
- ✅ Ícones reconhecíveis
- ✅ Termos do domínio (salão, faturamento, ticket médio)

### ⚠️ 3. User Control and Freedom
**Status:** ❌ **Falta**
- ❌ Sem opção de voltar ou refazer quiz
- ❌ Sem escape route clara
- ⚠️ CTA é único caminho (pode ser intencional em DRM)

### ✅ 4. Consistency and Standards
**Status:** ✅ **Bom**
- ✅ Usa componentes do design system (Container, PrimaryButton)
- ✅ Cores e tipografia consistentes
- ✅ Padrões visuais alinhados com o resto do site

### ✅ 5. Error Prevention
**Status:** ✅ **N/A**
- Não aplicável nesta página (não há inputs)

### ✅ 6. Recognition Rather Than Recall
**Status:** ✅ **Bom**
- ✅ Todas as informações visíveis
- ✅ Benefícios claramente listados
- ✅ CTA com texto descritivo

### ⚠️ 7. Flexibility and Efficiency
**Status:** ⚠️ **Parcial**
- ✅ Fluxo linear e direto (bom para novatos)
- ❌ Sem atalhos ou opções avançadas
- ⚠️ Apenas um caminho (pode ser intencional)

### ✅ 8. Aesthetic and Minimalist Design
**Status:** ✅ **Bom**
- ✅ Design limpo e focado
- ✅ Hierarquia visual clara
- ✅ Espaçamento generoso
- ⚠️ Poderia ser mais minimalista (menos elementos)

### ✅ 9. Help Users Recognize, Diagnose, and Recover from Errors
**Status:** ✅ **N/A**
- Não aplicável (sem erros possíveis)

### ⚠️ 10. Help and Documentation
**Status:** ⚠️ **Parcial**
- ✅ Informações contextuais presentes
- ❌ Sem FAQ ou ajuda adicional
- ❌ Sem contato ou suporte visível

---

## 🎨 Análise Visual Detalhada da Página

### Hierarquia de Informação na Página
**Ordem de Aparição Visual:**
1. **Background Pattern** (Camada 0 - Fundo)
2. **Ícone Circular Gradiente** (Nível 1 - Atenção Imediata)
3. **Título H1** (Nível 1 - Headline Principal)
4. **Parágrafo 1** (Nível 2 - Contexto Inicial)
5. **Parágrafo 2** (Nível 2 - Explicação)
6. **Parágrafo 3** (Nível 2 - Solução)
7. **Grid de 4 Benefícios** (Nível 3 - Detalhes Funcionais)
8. **Linha Divisória** (Separador Visual)
9. **CTA Principal** (Nível 4 - Ação de Conversão)

### Fluxo Visual Completo da Página
```
┌─────────────────────────────────────┐
│  Background: Grid Pattern (opacity) │
│  ┌───────────────────────────────┐  │
│  │  Container (max-w-4xl)        │  │
│  │  ┌─────────────────────────┐  │  │
│  │  │ Card Branco (shadow-lg) │  │  │
│  │  │                         │  │  │
│  │  │  [Ícone Search]         │  │  │
│  │  │  [Título H1]            │  │  │
│  │  │                         │  │  │
│  │  │  [Parágrafo 1]          │  │  │
│  │  │  [Parágrafo 2]          │  │  │
│  │  │  [Parágrafo 3]          │  │  │
│  │  │                         │  │  │
│  │  │  [Benefício 1] [Ben 2]  │  │  │
│  │  │  [Benefício 3] [Ben 4]  │  │  │
│  │  │                         │  │  │
│  │  │  ───────────────────    │  │  │
│  │  │  [CTA Button]           │  │  │
│  │  └─────────────────────────┘  │  │
│  └───────────────────────────────┘  │
└─────────────────────────────────────┘
```

**Avaliação:** ✅ Fluxo lógico e progressivo, mas pode ser otimizado

### Análise de Contraste e Legibilidade
**Cores Utilizadas na Página:**
- ✅ **Background:** `bg-[#f7f7f7]` (cinza muito claro)
- ✅ **Card:** `bg-white` (branco puro)
- ✅ **Texto Principal:** `text-gray-700` (cinza escuro)
- ✅ **Título:** `text-black` (preto)
- ✅ **Destaques:** `text-primary` (cor primária do tema)
- ✅ **Benefícios Background:** `bg-gray-50` (cinza claro)
- ✅ **Benefícios Texto:** `text-gray-900` (quase preto)

**Contraste Estimado:**
- Texto preto/cinza escuro em fundo branco: ✅ Excelente (>7:1)
- Texto primário em fundo branco: ⚠️ Verificar (deve ser ≥4.5:1)
- Fundo cinza claro vs branco: ✅ Suficiente para separação

**Recomendação:** Validar contraste WCAG AA com ferramenta (ex: WebAIM)

---

## 🚀 Análise de Performance da Página

### Componentes e Dependências da Página
**Arquivos Envolvidos:**
- `src/app/(pages)/resultados/page.tsx` - Página Next.js (client component)
- `src/components/quiz/quiz-results.tsx` - Componente principal
- `src/components/ui/container.tsx` - Wrapper
- `src/components/ui/primary-button.tsx` - Botão CTA
- `lucide-react` - Ícones SVG (5 ícones: Search, ArrowRight, TrendingUp, Users, DollarSign)

### Pontos Positivos de Performance
- ✅ **Client Component Simples:** Apenas renderização, sem lógica complexa
- ✅ **Ícones SVG:** Lucide React é otimizado, ícones são vetoriais leves
- ✅ **CSS Tailwind:** Classes utilitárias, sem CSS customizado pesado
- ✅ **Sem Imagens:** Nenhuma imagem rasterizada na página
- ✅ **Sem Dados Dinâmicos:** Página estática (answers vazio `{}`)
- ✅ **Sem Animações Pesadas:** Apenas transições CSS básicas

### Possíveis Melhorias de Performance
- ⚠️ **Code Splitting:** Se adicionar mais funcionalidades, considerar lazy loading
- ⚠️ **Otimização de Ícones:** Já otimizado (Lucide), mas verificar bundle size
- ⚠️ **Background Pattern:** `bg-grid-pattern` pode ser otimizado (CSS vs imagem)
- ⚠️ **Fonte:** Verificar se fontes (Fahkwang, Ubuntu) estão otimizadas

### Métricas Esperadas
- **First Contentful Paint (FCP):** < 1.8s (esperado)
- **Largest Contentful Paint (LCP):** < 2.5s (esperado - título H1)
- **Time to Interactive (TTI):** < 3.8s (esperado)
- **Cumulative Layout Shift (CLS):** < 0.1 (esperado - layout estável)

---

## 📱 Análise Mobile-First da Página

### Breakpoints Utilizados na Página
**Análise de Responsividade:**
- ✅ **Padding do Card:** `p-8` (mobile) → `md:p-12` (desktop)
- ✅ **Título:** `text-3xl` (mobile) → `md:text-4xl` (desktop)
- ✅ **Parágrafos:** `text-lg` (mobile) → `md:text-xl` (desktop)
- ✅ **Grid de Benefícios:** 1 coluna (mobile) → `md:grid-cols-2` (desktop)
- ✅ **Container:** `max-w-4xl` limita largura em todas as telas
- ✅ **Padding Vertical:** `py-16` fixo (pode ser otimizado)

### Experiência Mobile Específica
**Elementos Analisados:**
- ✅ **CTA Button:** `w-full` - ocupa largura total, fácil de tocar
- ✅ **Altura do Botão:** `h-11` (44px) - atende padrão mínimo de toque
- ✅ **Espaçamento entre Cards:** `gap-2` - muito pequeno, pode dificultar toque
- ✅ **Padding dos Cards de Benefícios:** `p-4` - adequado para mobile
- ✅ **Texto:** Tamanhos legíveis em mobile (`text-lg`)

### Problemas Potenciais em Mobile
- ⚠️ **Gap Muito Pequeno:** `gap-2` (8px) entre benefícios pode causar toques acidentais
- ⚠️ **Padding Vertical:** `py-16` (64px) pode criar muito scroll vertical
- ⚠️ **Espaçamento entre Parágrafos:** `mb-6` e `mb-8` podem ser reduzidos

### Recomendações Mobile
- Aumentar `gap-2` para `gap-4` ou `gap-6` no grid
- Reduzir `py-16` para `py-8 md:py-16` (menos scroll no mobile)
- Verificar área de toque mínima (44x44px) em todos os elementos interativos

---

## 🎯 Métricas de Conversão Sugeridas

### KPIs para Acompanhar
1. **Taxa de Clique no CTA** (CTR)
2. **Taxa de Conversão** (clique → lead)
3. **Tempo na Página**
4. **Taxa de Rejeição** (bounce)
5. **Scroll Depth** (até onde usuário rola)

### Eventos para Rastrear
- `quiz_results_viewed`
- `cta_clicked`
- `benefit_viewed` (cada benefício)
- `page_scroll_depth` (25%, 50%, 75%, 100%)

---

## 🔧 Recomendações Prioritárias

### Prioridade ALTA (Implementar Primeiro)
1. ✅ **Otimizar destino do CTA** - Redirecionar para landing page específica
2. ✅ **Adicionar prova social** - Depoimento ou números
3. ✅ **Implementar onRestart** - Permitir refazer quiz
4. ✅ **Aumentar gap do grid** - Melhorar legibilidade

### Prioridade MÉDIA
5. ✅ **Adicionar feedback de conclusão** - Confetti ou badge
6. ✅ **Otimizar espaçamentos** - Reduzir scroll necessário
7. ✅ **Melhorar acessibilidade** - Landmarks e ARIA

### Prioridade BAIXA
8. ✅ **Adicionar micro-interações** - Animações sutis
9. ✅ **Melhorar ícone contextual** - Mais representativo
10. ✅ **Adicionar loading state** - Se necessário

---

## 📝 Checklist de Implementação

### Conversão (Direct Response)
- [ ] CTA redireciona para landing page otimizada
- [ ] Prova social visível (depoimento/números)
- [ ] Elemento de urgência/escassez (se aplicável)
- [ ] Tracking de eventos implementado

### UX/Usabilidade
- [ ] Opção de refazer quiz implementada
- [ ] Feedback visual de conclusão
- [ ] Espaçamentos otimizados
- [ ] Gap do grid aumentado

### Acessibilidade
- [ ] Landmarks semânticos (`<main>`, `aria-label`)
- [ ] Estrutura de headings correta
- [ ] Contraste WCAG AA validado
- [ ] Navegação por teclado testada

### Performance
- [ ] Lazy loading se necessário
- [ ] Animações otimizadas
- [ ] Bundle size verificado

---

## 🎓 Conclusão - Análise da Página de Resultados

### Resumo da Análise
A página `/resultados` foi analisada em detalhes, considerando cada elemento visual, estrutural e de interação presente. A análise focou exclusivamente nesta página, sem referências a outras partes do fluxo.

### Pontos Fortes Identificados
1. ✅ **Layout limpo e focado** - Card branco centralizado cria hierarquia clara
2. ✅ **Copy persuasiva mantida** - Texto original preservado e eficaz
3. ✅ **CTA proeminente** - Botão grande e visível no final do fluxo
4. ✅ **Design responsivo** - Mobile-first implementado corretamente
5. ✅ **Performance otimizada** - Componente leve, sem dependências pesadas

### Oportunidades Críticas de Melhoria
1. 🔴 **CTA redireciona para home** - Deveria ir para landing page específica
2. 🔴 **Falta prova social** - Nenhum elemento de credibilidade visível
3. 🔴 **Falta urgência/escassez** - Sem elementos que criem senso de urgência
4. 🟡 **Gap muito pequeno** - `gap-2` entre benefícios reduz legibilidade
5. 🟡 **onRestart não implementado** - Usuário sem controle para refazer quiz
6. 🟡 **Falta feedback de conclusão** - Não comunica que quiz foi completado

### Recomendações Prioritárias
**Implementar Primeiro (ALTA):**
1. Otimizar destino do CTA (não para `/`)
2. Adicionar prova social (depoimento ou números)
3. Implementar funcionalidade `onRestart`
4. Aumentar gap do grid (`gap-2` → `gap-4` ou `gap-6`)

**Implementar Depois (MÉDIA):**
5. Adicionar feedback visual de conclusão
6. Otimizar espaçamentos verticais
7. Melhorar estrutura semântica (acessibilidade)

### Métricas para Acompanhar
Após implementar melhorias, acompanhar:
- Taxa de clique no CTA (CTR)
- Taxa de conversão (clique → lead)
- Tempo na página
- Scroll depth (até onde usuário rola)
- Taxa de rejeição (bounce)

---

**Nota Final:** Esta análise foi 100% focada na página `/resultados`, analisando cada elemento presente. A copy original foi mantida intacta, focando apenas em melhorias de UX, design e estrutura que não alteram o texto existente.

