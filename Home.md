
```todoist
{
"name": "Today",
"filter": "today | overdue"
}
```


![[Upcoming Tasks]]

--- 

# Recent Files
```dataview
table file.mtime as "Last Modified"
where file.mtime < (date(today) + dur(1 day))
sort file.mtime DESC
limit 6
```
