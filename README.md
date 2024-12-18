# playwright-example
Playwrigth example

## Локаторы.

### CSS-селекторы:
```
await page.locator('div.classname');
await page.locator('#id');
await page.locator('input[name="email"]');
```

### Текстовые локаторы:
```
await page.locator('text="Login"'); // Точный текст
await page.locator('text=Login');  // Подстрока
```

### Роли:
```
await page.getByRole('button', { name: 'Submit' });
```

### XPath:
```
await page.locator('//div[@class="classname"]');
```

### Локаторы по атрибутам:
```
await page.locator('[data-testid="test-id"]');
await page.locator('[placeholder="Search"]');
await page.locator('[aria-label="Close"]');
```

### Локаторы дочерних элементов:
```
await page.locator('.parent >> .child');
await page.locator('div:has-text("Submit")');
```

## Actions (Действия)

```
await page.click('button#submit');               // Клик
await page.fill('input[name="email"]', 'test@example.com'); // Ввод текста
await page.type('input[name="email"]', 'test');  // Поэтапный ввод
await page.press('input[name="password"]', 'Enter'); // Нажатие клавиши

await page.hover('button');                     // Наведение мыши
await page.dblclick('button');                  // Двойной клик
await page.mouse.move(100, 200);                // Перемещение мыши
await page.mouse.down();                        // Нажатие мыши
await page.mouse.up();                          // Отпускание мыши

await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight)); // Прокрутка вниз
await page.locator('div').scrollIntoViewIfNeeded();

await page.setInputFiles('input[type="file"]', 'path/to/file.jpg');
await page.setInputFiles('input[type="file"]', []); // Удалить файлы

await page.selectOption('select#dropdown', 'value1');
await page.selectOption('select#dropdown', { label: 'Option 1' });

await page.check('input[type="checkbox"]');  // Установить
await page.uncheck('input[type="checkbox"]'); // Снять
```

## Inspections (Инспекции)

```
const text = await page.locator('h1').textContent(); // Получить текст
const href = await page.locator('a').getAttribute('href'); // Получить аттрибут

const isVisible = await page.locator('button').isVisible();   // Видимость
const isEnabled = await page.locator('button').isEnabled();   // Активность
const isChecked = await page.locator('input[type="checkbox"]').isChecked(); // Установлен ли чекбокс

const value = await page.locator('input[name="email"]').inputValue(); // Получение значение инпута
```

## Assertions (Утверждения)

```
await expect(page.locator('h1')).toHaveText('Welcome');
await expect(page.locator('h1')).toContainText('Wel');

await expect(page.locator('button')).toBeVisible();
await expect(page.locator('button')).not.toBeVisible();

await expect(page.locator('input')).toBeEnabled();
await expect(page.locator('input')).toBeDisabled();
await expect(page.locator('input[type="checkbox"]')).toBeChecked();

await expect(page.locator('input[name="email"]')).toHaveValue('test@example.com');

await expect(page.locator('a')).toHaveAttribute('href', '/home');

await expect(page).toHaveURL('https://example.com/dashboard');
```
