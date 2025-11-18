# API do Minisite do Profissional

Esta documentação descreve as rotas da API para o sistema de minisite do profissional, permitindo a criação e gerenciamento de perfis públicos.

## Base URL
```
/api/public-profile
```

## Autenticação
Todas as rotas requerem autenticação via token Bearer, exceto a rota pública de visualização do perfil.

---

## Rotas Autenticadas

### 1. Criar Perfil Público
**POST** `/create`

Cria um novo perfil público para o usuário autenticado.

**Headers:**
```
Authorization: Bearer <token>
Content-Type: application/json
```

**Body:**
```json
{
  "name": "string (obrigatório)",
  "slug": "string (obrigatório, único)",
  "phone": "string (obrigatório)",
  "bio": "string (opcional)",
  "postal_code": "string (opcional)",
  "address_number": "string (opcional)",
  "state": "string (obrigatório)",
  "city": "string (obrigatório)",
  "street": "string (opcional)",
  "business_name": "string (opcional)",
  "instagram_link": "string (opcional)",
  "whatsapp_link": "string (opcional)",
  "tiktok_link": "string (opcional)",
  "linkedin_link": "string (opcional)",
  "show_phone": "boolean (opcional, padrão: false)",
  "show_address": "boolean (opcional, padrão: false)",
  "show_links": "boolean (opcional, padrão: false)",
  "custom_links": [
    {
      "name": "string (obrigatório)",
      "url": "string (obrigatório)",
      "active": "boolean (opcional, padrão: true)"
    }
  ],
  "services": [
    {
      "name": "string (obrigatório)",
      "description": "string (opcional)",
      "price_from": "number (opcional)",
      "price_to": "number (opcional)",
      "duration_hours": "number (opcional)"
    }
  ],
  "opening_hours": [
    {
      "weekday": "enum (obrigatório: MONDAY, TUESDAY, WEDNESDAY, THURSDAY, FRIDAY, SATURDAY, SUNDAY)",
      "start_time": "string (obrigatório, formato HH:MM)",
      "end_time": "string (obrigatório, formato HH:MM)",
      "active": "boolean (opcional, padrão: true)"
    }
  ],
  "payment_methods": [
    {
      "method": "enum (obrigatório: CASH, CREDIT_CARD, DEBIT_CARD, PIX, BANK_TRANSFER)",
      "active": "boolean (opcional, padrão: true)"
    }
  ]
}
```

**Resposta de Sucesso (201):**
```json
{
  "id": 1,
  "user_id": 123,
  "name": "João Silva",
  "slug": "joao-silva",
  "phone": "11999999999",
  "bio": "Profissional experiente...",
  "state": "SP",
  "city": "São Paulo",
  "created_at": "2024-01-15T10:30:00Z",
  "updated_at": "2024-01-15T10:30:00Z"
}
```

**Resposta de Erro (400):**
```json
{
  "error": "SLUG_ALREADY_TAKEN",
  "message": "Slug already in use."
}
```

**Resposta de Erro (400):**
```json
{
  "error": "USER_ALREADY_HAS_PROFILE",
  "message": "User already has an active public profile."
}
```

---

### 2. Obter Meu Perfil
**GET** `/me`

Retorna o perfil público do usuário autenticado.

**Headers:**
```
Authorization: Bearer <token>
```

**Resposta de Sucesso (200):**
```json
{
  "id": 1,
  "user_id": 123,
  "name": "João Silva",
  "slug": "joao-silva",
  "phone": "11999999999",
  "bio": "Profissional experiente...",
  "state": "SP",
  "city": "São Paulo",
  "show_phone": true,
  "show_address": false,
  "show_links": true,
  "custom_links": [
    {
      "id": 1,
      "name": "Meu Site",
      "url": "https://meusite.com",
      "active": true
    }
  ],
  "services": [
    {
      "id": 1,
      "name": "Consultoria",
      "description": "Consultoria especializada",
      "price_from": 100,
      "price_to": 500,
      "duration_hours": 2
    }
  ],
  "opening_hours": [
    {
      "id": 1,
      "weekday": "MONDAY",
      "start_time": "09:00",
      "end_time": "18:00",
      "active": true
    }
  ],
  "payment_methods": [
    {
      "id": 1,
      "method": "PIX",
      "active": true
    }
  ],
  "gallery": [
    {
      "id": 1,
      "file_id": 123,
      "position": 1,
      "caption": "Foto do ambiente",
      "File": {
        "id": 123,
        "filename": "ambiente.jpg",
        "url": "https://api.example.com/files/123"
      }
    }
  ]
}
```

**Resposta de Erro (404):**
```json
{
  "error": "PROFILE_NOT_FOUND",
  "message": "Public profile not found."
}
```

---

### 3. Atualizar Perfil
**PUT** `/update`

Atualiza o perfil público do usuário autenticado.

**Headers:**
```
Authorization: Bearer <token>
Content-Type: application/json
```

**Body:** (Mesmo formato do POST `/create`)

**Resposta de Sucesso (200):**
```json
{
  "id": 1,
  "user_id": 123,
  "name": "João Silva Atualizado",
  "slug": "joao-silva",
  "phone": "11999999999",
  "updated_at": "2024-01-15T11:30:00Z"
}
```

---

### 4. Anexar Foto de Perfil
**POST** `/avatar`

Anexa uma foto de perfil ao perfil público.

**Headers:**
```
Authorization: Bearer <token>
Content-Type: application/json
```

**Body:**
```json
{
  "file_id": 123
}
```

**Resposta de Sucesso (201):**
```json
{
  "gallery_id": 456,
  "file_id": 123
}
```

**Resposta de Erro (404):**
```json
{
  "error": "FILE_NOT_FOUND",
  "message": "Arquivo não encontrado."
}
```

**Resposta de Erro (403):**
```json
{
  "error": "FILE_NOT_OWNED",
  "message": "Arquivo não pertence ao usuário."
}
```

---

### 5. Anexar Imagens à Galeria
**POST** `/gallery`

Anexa múltiplas imagens à galeria do perfil público.

**Headers:**
```
Authorization: Bearer <token>
Content-Type: application/json
```

**Body:**
```json
{
  "items": [
    {
      "file_id": 123,
      "position": 1,
      "caption": "Descrição da imagem"
    },
    {
      "file_id": 124,
      "position": 2,
      "caption": "Outra imagem"
    }
  ]
}
```

**Resposta de Sucesso (201):**
```json
[
  {
    "id": 456,
    "public_profile_id": 1,
    "file_id": 123,
    "position": 1,
    "caption": "Descrição da imagem"
  },
  {
    "id": 457,
    "public_profile_id": 1,
    "file_id": 124,
    "position": 2,
    "caption": "Outra imagem"
  }
]
```

---

## Rotas Públicas

### 6. Visualizar Perfil Público
**GET** `/public/{slug}`

Acessa o perfil público através do slug (sem autenticação).

**Parâmetros:**
- `slug`: Slug único do perfil

**Resposta de Sucesso (200):**
```json
{
  "id": 1,
  "name": "João Silva",
  "slug": "joao-silva",
  "phone": "11999999999",
  "bio": "Profissional experiente...",
  "state": "SP",
  "city": "São Paulo",
  "business_name": "João Silva Consultoria",
  "instagram_link": "https://instagram.com/joao",
  "whatsapp_link": "https://wa.me/5511999999999",
  "show_phone": true,
  "show_address": false,
  "show_links": true,
  "custom_links": [
    {
      "name": "Meu Site",
      "url": "https://meusite.com",
      "active": true
    }
  ],
  "services": [
    {
      "name": "Consultoria",
      "description": "Consultoria especializada",
      "price_from": 100,
      "price_to": 500,
      "duration_hours": 2
    }
  ],
  "opening_hours": [
    {
      "weekday": "MONDAY",
      "start_time": "09:00",
      "end_time": "18:00",
      "active": true
    }
  ],
  "payment_methods": [
    {
      "method": "PIX",
      "active": true
    }
  ],
  "gallery": [
    {
      "id": 1,
      "position": 1,
      "caption": "Foto do ambiente",
      "File": {
        "filename": "ambiente.jpg",
        "url": "https://api.example.com/files/123"
      }
    }
  ]
}
```

**Resposta de Erro (404):**
```json
{
  "error": "PROFILE_NOT_FOUND",
  "message": "Public profile not found."
}
```

---

## Schemas dos DTOs

### CreatePublicProfileLinkDTO
```typescript
{
  name: string;           // Nome do link
  url: string;           // URL do link
  active?: boolean;      // Se o link está ativo (padrão: true)
}
```

### CreatePublicProfileServiceDTO
```typescript
{
  name: string;                    // Nome do serviço
  description?: string;            // Descrição do serviço
  price_from?: number;             // Preço mínimo
  price_to?: number;               // Preço máximo
  duration_hours?: number;         // Duração em horas
}
```

### CreatePublicProfileOpeningHourDTO
```typescript
{
  weekday: Weekday;               // Dia da semana (enum)
  start_time: string;             // Horário de início (HH:MM)
  end_time: string;               // Horário de fim (HH:MM)
  active?: boolean;               // Se está ativo (padrão: true)
}
```

### CreatePublicProfilePaymentMethodDTO
```typescript
{
  method: PaymentMethodType;       // Tipo de pagamento (enum)
  active?: boolean;               // Se está ativo (padrão: true)
}
```

### AttachGalleryImageItemDTO
```typescript
{
  file_id: number;                // ID do arquivo
  position?: number;              // Posição na galeria
  caption?: string;               // Legenda da imagem
}
```

---

## Enums

### Weekday
```typescript
enum Weekday {
  MONDAY = "MONDAY",
  TUESDAY = "TUESDAY",
  WEDNESDAY = "WEDNESDAY",
  THURSDAY = "THURSDAY",
  FRIDAY = "FRIDAY",
  SATURDAY = "SATURDAY",
  SUNDAY = "SUNDAY"
}
```

### PaymentMethodType
```typescript
enum PaymentMethodType {
  CASH = "CASH",
  CREDIT_CARD = "CREDIT_CARD",
  DEBIT_CARD = "DEBIT_CARD",
  PIX = "PIX",
  BANK_TRANSFER = "BANK_TRANSFER"
}
```

### State
```typescript
enum State {
  AC = "AC",
  AL = "AL",
  AP = "AP",
  AM = "AM",
  BA = "BA",
  CE = "CE",
  DF = "DF",
  ES = "ES",
  GO = "GO",
  MA = "MA",
  MT = "MT",
  MS = "MS",
  MG = "MG",
  PA = "PA",
  PB = "PB",
  PR = "PR",
  PE = "PE",
  PI = "PI",
  RJ = "RJ",
  RN = "RN",
  RS = "RS",
  RO = "RO",
  RR = "RR",
  SC = "SC",
  SP = "SP",
  SE = "SE",
  TO = "TO"
}
```

---

## Códigos de Erro

| Código | Erro | Descrição |
|--------|------|-----------|
| 400 | SLUG_ALREADY_TAKEN | Slug já está em uso |
| 400 | USER_ALREADY_HAS_PROFILE | Usuário já possui perfil público |
| 403 | FILE_NOT_OWNED | Arquivo não pertence ao usuário |
| 403 | FILE_NOT_FOR_PROFILE | Arquivo não pertence a este perfil |
| 404 | PROFILE_NOT_FOUND | Perfil público não encontrado |
| 404 | FILE_NOT_FOUND | Arquivo não encontrado |
| 400 | FILE_INVALID_TYPE | Arquivo não é do tipo válido |
| 500 | ERROR_REPORT_CREATING_FAILED | Erro interno do servidor |

---

## Notas Importantes

1. **Slug Único**: O slug deve ser único em todo o sistema e será usado para acessar o perfil público.

2. **Arquivos**: Todos os arquivos devem ser enviados primeiro para o endpoint de upload de arquivos antes de serem anexados ao perfil.

3. **Validação de Arquivos**: Apenas arquivos de imagem (JPEG, PNG, GIF, WebP) são aceitos para fotos de perfil e galeria.

4. **Visibilidade**: Os campos `show_phone`, `show_address` e `show_links` controlam quais informações são exibidas no perfil público.

5. **Relações**: O sistema mantém relacionamentos entre perfil, links customizados, serviços, horários de funcionamento, métodos de pagamento e galeria de imagens.

6. **Transações**: Operações que envolvem múltiplas entidades são executadas em transações para garantir consistência dos dados.
