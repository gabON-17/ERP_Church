# ERP CHURCH

### Descrição
Esse ERP foi criado com a intenção de gerenciar cultos, ofertas e membros de uma igreja

### Tecnologias utilizadas
- TypeScript
- Postegres
- Express
- Node.js
- Pino (logger)

### Endpoints MEMBROS>

> **[GET] /members/:** Retorna um array com todos os membros salvos do banco de dados
> ***Exemplo de resposta***:
> ```json
>{
>   "message": "OK",
>   "statusCode": 200,
>   "totalUsers": 1,
>   "users": {
>       "uuid": "34324dfyfggyasgfihadasd3",
>       "full_name": "Test Name Full",
>       "social_name": "Test Name Social",
>       "date_birth": "2026-02-09",
>       "sex": "M",
>       "telephone": "552193954385",
>       "email": "test@email.com",
>       "address": {
>           "road": "Steet 4A",
>           "number": 500,
>           "district": "District YXZ",
>           "city": "Test City",
>       },
>       "ministry": ["...Ministrys"],
>       "contributions": ["...Contribution"],
>       "status": "Ativo",
>       "presence": 50,
>       "date_baptism": "2026-02-09",
>       "createAt":"2026-10-22T14:30:00000Z",   
>       "updateAt": "2026-10-22T14:30:00.000Z"
>   }
>},
>```
> **OBS: Tudo que contem ...Algo são objetos em contrução**

> **[GET] /members/:uuid:** Retorna o membro específico através do uuid fornecido na URL

> **[POST] /members/create:** Cria um usuário no sistema
> DTO solicitado: