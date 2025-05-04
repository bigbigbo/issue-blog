import type { Meta, StoryObj } from "@storybook/react";

import Text from "./text";

const meta = {
  title: "组件/Typography/Text",
  component: Text,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
  argTypes: {
    variant: {
      control: "select",
      options: ["default", "primary", "secondary", "success", "warning", "danger"],
      description: "文本的样式变体",
    },
    size: {
      control: "select",
      options: ["sm", "md", "lg"],
      description: "文本的大小",
    },
    weight: {
      control: "select",
      options: ["light", "normal", "medium", "semibold", "bold"],
      description: "文本的字重",
    },
    as: {
      control: "select",
      options: ["span", "strong", "em", "mark", "code", "del", "ins"],
      description: "文本渲染的HTML元素",
    },
    children: {
      control: "text",
      description: "文本内容",
    },
  },
} satisfies Meta<typeof Text>;

export default meta;
type Story = StoryObj<typeof meta>;

// 基础文本样式
export const 基础: Story = {
  args: {
    children: "这是一段基础文本",
  },
};

// 文本变体
export const 变体: Story = {
  args: {
    children: "文本变体示例",
  },
  render: () => (
    <div className="space-y-4">
      <Text variant="default">默认文本</Text>
      <Text variant="primary">主要文本</Text>
      <Text variant="secondary">次要文本</Text>
      <Text variant="success">成功文本</Text>
      <Text variant="warning">警告文本</Text>
      <Text variant="danger">危险文本</Text>
    </div>
  ),
};

// 文本大小
export const 大小: Story = {
  args: {
    children: "文本大小示例",
  },
  render: () => (
    <div className="space-y-4">
      <Text size="sm">小号文本</Text>
      <Text size="md">中号文本</Text>
      <Text size="lg">大号文本</Text>
    </div>
  ),
};

// 文本字重
export const 字重: Story = {
  args: {
    children: "文本字重示例",
  },
  render: () => (
    <div className="space-y-4">
      <Text weight="light">轻量文本</Text>
      <Text weight="normal">常规文本</Text>
      <Text weight="medium">中等文本</Text>
      <Text weight="semibold">半粗文本</Text>
      <Text weight="bold">粗体文本</Text>
    </div>
  ),
};

// 文本元素类型
export const 元素类型: Story = {
  args: {
    children: "文本元素类型示例",
  },
  render: () => (
    <div className="space-y-4">
      <Text as="span">普通文本 (span)</Text>
      <div>
        <Text as="strong">强调文本 (strong)</Text>
      </div>
      <div>
        <Text as="em">斜体文本 (em)</Text>
      </div>
      <div>
        <Text as="mark">标记文本 (mark)</Text>
      </div>
      <div>
        <Text as="code">代码文本 (code)</Text>
      </div>
      <div>
        <Text as="del">删除文本 (del)</Text>
      </div>
      <div>
        <Text as="ins">插入文本 (ins)</Text>
      </div>
    </div>
  ),
};
