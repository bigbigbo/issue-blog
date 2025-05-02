# Typography 排版组件

Typography是一套完整的文本排版组件系统，提供了标题、文本、段落和链接组件，用于构建一致且美观的文本内容。

## 组件特点

- 支持 Title（标题）、Text（文本）、Paragraph（段落）和Link（链接）四种基本组件
- 支持使用 `Typography.Text` 这种形式调用
- 基于Tailwind CSS构建，支持深色模式和响应式设计
- 每个组件都有丰富的变体和样式选项
- 所有组件均为React Server Components友好的设计

## 安装依赖

本组件使用了以下依赖：

```bash
pnpm add clsx class-variance-authority --exact
```

## 基本用法

```tsx
import { Typography } from "@/components/typography";

export default function MyComponent() {
  return (
    <div>
      <Typography.Title level={2}>这是一个标题</Typography.Title>
      <Typography.Paragraph>
        这是一个段落，可以包含<Typography.Text variant="primary">强调文本</Typography.Text>和
        <Typography.Link href="/about">链接</Typography.Link>。
      </Typography.Paragraph>
    </div>
  );
}
```

## 组件API

### Typography.Title

标题组件，用于展示不同级别的标题。

**属性**

| 属性名      | 类型                                              | 默认值    | 说明                |
| ----------- | ------------------------------------------------- | --------- | ------------------- |
| level       | 1-6                                               | 3         | 标题级别，对应h1-h6 |
| align       | 'left' \| 'center' \| 'right'                     | 'left'    | 文本对齐方式        |
| colorScheme | 'default' \| 'primary' \| 'secondary' \| 'accent' | 'default' | 颜色方案            |
| className   | string                                            | -         | 自定义类名          |
| children    | ReactNode                                         | -         | 子元素              |

### Typography.Text

文本组件，用于展示各种样式的行内文本。

**属性**

| 属性名    | 类型                                                                        | 默认值    | 说明             |
| --------- | --------------------------------------------------------------------------- | --------- | ---------------- |
| variant   | 'default' \| 'primary' \| 'secondary' \| 'success' \| 'warning' \| 'danger' | 'default' | 文本变体         |
| size      | 'sm' \| 'md' \| 'lg'                                                        | 'md'      | 文本大小         |
| weight    | 'light' \| 'normal' \| 'medium' \| 'semibold' \| 'bold'                     | 'normal'  | 字重             |
| as        | 'span' \| 'strong' \| 'em' \| 'mark' \| 'code' \| 'del' \| 'ins'            | 'span'    | 渲染为的HTML元素 |
| className | string                                                                      | -         | 自定义类名       |
| children  | ReactNode                                                                   | -         | 子元素           |

### Typography.Paragraph

段落组件，用于展示大段文本内容。

**属性**

| 属性名      | 类型                             | 默认值    | 说明       |
| ----------- | -------------------------------- | --------- | ---------- |
| size        | 'sm' \| 'md' \| 'lg'             | 'md'      | 文本大小   |
| colorScheme | 'default' \| 'muted' \| 'accent' | 'default' | 颜色方案   |
| className   | string                           | -         | 自定义类名 |
| children    | ReactNode                        | -         | 子元素     |

### Typography.Link

链接组件，用于创建各种样式的链接。

**属性**

| 属性名    | 类型                              | 默认值    | 说明                                   |
| --------- | --------------------------------- | --------- | -------------------------------------- |
| variant   | 'default' \| 'subtle' \| 'button' | 'default' | 链接变体                               |
| underline | 'always' \| 'hover' \| 'none'     | 'hover'   | 下划线样式                             |
| href      | string                            | -         | 链接地址                               |
| external  | boolean                           | false     | 是否为外部链接，为true时会在新窗口打开 |
| className | string                            | -         | 自定义类名                             |
| children  | ReactNode                         | -         | 子元素                                 |

## 示例

查看 `example.tsx` 文件获取更多使用示例。

## 自定义主题

Typography组件使用Tailwind CSS类名进行样式设置，你可以通过以下方式自定义主题：

1. 修改 `src/components/typography/index.tsx` 文件中的变体定义
2. 使用 `className` 属性添加自定义类名
3. 在你的Tailwind CSS配置中自定义颜色、字体等
