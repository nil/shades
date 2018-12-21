# shades

## Project setup
```
yarn install
```

### Compiles and hot-reloads for development
```
yarn run serve
```

### Compiles and minifies for production
```
yarn run build
```

### Lints and fixes files
```
yarn run lint
```

## Information for myself

### Structure for the CSS variable

```css
var(--[category]_[element]--[property])
```

Examples:

```css
var(--t_base--font-family)
var(--s_input-preview--border-width)
var(--c_base--background)
```

| Category   | Letter   |
|------------|----------|
| Typography | `t`      |
| Color      | `c`      |
| Size       | `s`      |
| Other      | `o`      |

### Aliases for folders and files

| Alias   | Folder or file |
|---------|----------------|
| `c`     | `components/`  |
| `a`     | `assets/`      |
| `js`    | `src/js/`      |
| `store` | `src/store.js` |
