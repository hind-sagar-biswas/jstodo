# jstodo
A to-do app in JavaScript and Bootstrap4

## Demo

Live demo @ [https://hind-sagar-biswas.github.io/jstodo/](https://hind-sagar-biswas.github.io/jstodo/)

## Features

1. Add Task

1. Divide tasks based on categories

1. Check Task

1. Uncheck Task

1. Delete Task

1. Progress Saving (***i.e.*** The Tasks won't get deleted after the window or tab closes.)

1. Share Tasks (by import-export)

1. Use `toDo Code`

### toDo Code

toDo Codes are special codes or keywords to use in the app to **get *fun features***

#### Structure

`  ---{code name}::{code value}`

#### For Categories

Use these codes in 'add category' input box after category name.

**Available codes**

* `{code name} = type`: *to set the type of category.*
  
  1. `{value} = const` : *makes the category unable to delete.*

* `{code name}` = `badge`: *to get a badge for the category.*
  
  1. `{value} = {badge text}::{badge color}`: 
    
    1. `{badge text}`: the text you want to show on badge. **Default:** *none*.
    
    1. `{badge color}`: the of the badge. **Default:** *dark*. **Supported color codes:** All bootstrap color classes.

## Languages

1. HTML5

1. CSS3

1. Vanilla JavaScript

## Frameworks

1. Bootstrap4

1. Font awesome

## Licence

This code has been licenced under MIT open source license.
