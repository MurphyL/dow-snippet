---
title: "ElasticSearch Bucket 聚合"
---

## 分桶聚合

```json
{
	"size": 0,
	"aggs": {
		"users_twitter_count": {
			"terms": {
				"field": "author_id"
			}
		},
		"range_twitter_count": {
			"range": {
				"field": "author_id",
				"ranges": [
					{
						"to": 50,
						"key": "A组"
					},
					{
						"from": 50,
						"to": 100,
						"key": "B组"
					},
					{
						"from": 100,
						"key": "C组"
					}
				]
			}
		},
		"keyed_twitter_count": {
			"range": {
				"field": "author_id",
				"keyed": true,
				"ranges": [
					{
						"to": 50,
						"key": "A组"
					},
					{
						"from": 50,
						"to": 100,
						"key": "B组"
					},
					{
						"from": 100,
						"key": "C组"
					}
				]
			}
		}
	}
}
```