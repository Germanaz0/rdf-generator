# Excel to JsonLD

This a POC that converts an excel file, to jsonld and then store it to an rdf database.

THIS REPO IS A PROOF OF CONCEPT, DO NOT USE.


## Query

```sparql

PREFIX d: <http://schema.org/> 
PREFIX name: <http://schema.org/name> 

SELECT ?person ?name
WHERE
{ 
  ?person d:name ?name .
  ?person d:nationality "French" . 
}
```