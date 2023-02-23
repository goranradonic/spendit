# SPENDIT AG - assignment

In order to run app write:
```
npm install
node apiserver/server.js

npm start

you can open app on:http://localhost:3000
```

## Required

```
Node: 16
```

## Note

#### Why HTML div instead of classic table?

It is easier to use standard HTML tables. But rendering a standard table **takes >30%** more time than rendering the same data in a div table. If the data is small the users will not appreciate the rendering time difference. But if users are to see lots of data, they will be happier if the data is displayed in a div table.

div tables with flex rows are slightly less performant than div tables with inline-block cells. However, inline-block cells prevent users from efficiently selecting contents with a double click.

In summary, if I develop application displaying lots of data in tables, I will use div tables with flex rows.

#### Checkbox

Here the checkboxes are implemented in a simple way, in real production I would make a separate component for them
