# Odin Members Only

## Database design

### user

| column     |   data type | null |   constraints |    notes |
| ---------- | ----------: | :--: | ------------: | -------: |
| user_id    |         int |  X   |            PK |          |
| first_name |     varchar |  X   |               | alphabet |
| last_name  |     varchar |  X   |               | alphabet |
| username   |     varchar |  X   |        unique |    email |
| password   |     varchar |  X   |               |          |
| status     |     boolean |  X   |  default true |          |
| is_admin   |     boolean |  X   | default false |          |
| created_at | timestamptz |  X   |   default now |          |

### message

| column     |   data type | null | constraints | notes |
| ---------- | ----------: | :--: | ----------: | ----: |
| message_id |         int |  X   |          PK |       |
| user_id    |         int |  X   |          FK |       |
| title      |     varchar |  X   |             |       |
| content    |        text |  X   |             |       |
| created_at | timestamptz |  X   | default now |       |
