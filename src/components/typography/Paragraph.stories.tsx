import type { Meta, StoryObj } from "@storybook/react";

import Link from "./link";
import Paragraph from "./paragraph";
import Text from "./text";

const meta = {
  title: "组件/Typography/Paragraph",
  component: Paragraph,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
  argTypes: {
    size: {
      control: "select",
      options: ["sm", "md", "lg"],
      description: "段落文本大小",
    },
    color: {
      control: "select",
      options: ["default", "muted", "accent"],
      description: "段落文本颜色",
    },
    children: {
      control: "text",
      description: "段落内容",
    },
  },
} satisfies Meta<typeof Paragraph>;

export default meta;
type Story = StoryObj<typeof meta>;

const loremText =
  "Typography的段落组件支持多种尺寸和颜色方案，适用于不同场景的长文本内容展示。段落组件可以与其他Typography组件组合使用。";

// 基础段落样式
export const 基础: Story = {
  args: {
    children: loremText,
  },
};

// 段落大小
export const 大小: Story = {
  args: {
    children: "段落大小示例",
  },
  render: () => (
    <div className="max-w-xl space-y-6">
      <Paragraph size="sm">小号段落：{loremText}</Paragraph>
      <Paragraph size="md">中号段落：{loremText}</Paragraph>
      <Paragraph size="lg">大号段落：{loremText}</Paragraph>
    </div>
  ),
};

// 段落颜色
export const 颜色: Story = {
  args: {
    children: "段落颜色示例",
  },
  render: () => (
    <div className="max-w-xl space-y-6">
      <Paragraph color="default">默认颜色段落：{loremText}</Paragraph>
      <Paragraph color="muted">次要颜色段落：{loremText}</Paragraph>
      <Paragraph color="accent">强调颜色段落：{loremText}</Paragraph>
    </div>
  ),
};

// 段落与其他组件组合
export const 组合使用: Story = {
  args: {
    children: "段落与其他组件组合示例",
  },
  render: () => (
    <div className="max-w-xl space-y-6">
      <Paragraph>
        段落组件可以与其他Typography组件组合使用，例如可以在段落中插入
        <Text variant="primary">强调文本</Text>和<Link href="#">链接</Link>。
      </Paragraph>
      <Paragraph>
        这是一个包含多种样式的段落，展示了
        <Text variant="success">成功状态文本</Text>、<Text variant="warning">警告状态文本</Text>以及
        <Text variant="danger">危险状态文本</Text>。 你还可以插入<Text as="code">代码片段</Text>或者
        <Text as="mark">标记重点内容</Text>。
      </Paragraph>
    </div>
  ),
};
