---
title: "Hive SQL"
---

```sql
with json_tuple as (
    select '{"a":1, "b": 2}' as x
) 
select get_json_object(x, '$.a') from json_tuple
```