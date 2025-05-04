import type { Meta, StoryObj } from "@storybook/react";

import Title from "./title";

const meta = {
  title: "组件/Typography/Title",
  component: Title,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
  argTypes: {
    level: {
      control: { type: "range", min: 1, max: 6 },
      description: "标题级别，对应 h1-h6",
    },
    align: {
      control: "select",
      options: ["left", "center", "right"],
      description: "文本对齐方式",
    },
    color: {
      control: "select",
      options: ["default", "primary", "secondary", "accent"],
      description: "颜色样式",
    },
    children: {
      control: "text",
      description: "标题内容",
    },
  },
} satisfies Meta<typeof Title>;

export default meta;
type Story = StoryObj<typeof meta>;

// 基础标题样式
export const 基础: Story = {
  args: {
    children: "标题示例",
    level: 2,
  },
};

// 标题级别
export const 标题级别: Story = {
  args: {
    children: "标题级别示例",
  },
  render: () => (
    <div className="space-y-4">
      <Title level={1}>H1 标题</Title>
      <Title level={2}>H2 标题</Title>
      <Title level={3}>H3 标题</Title>
      <Title level={4}>H4 标题</Title>
      <Title level={5}>H5 标题</Title>
      <Title level={6}>H6 标题</Title>
    </div>
  ),
};

// 对齐方式
export const 对齐方式: Story = {
  args: {
    children: "对齐方式示例",
  },
  render: () => (
    <div className="w-80 space-y-8">
      <Title level={3} align="left">
        左对齐标题
      </Title>
      <Title level={3} align="center">
        居中对齐标题
      </Title>
      <Title level={3} align="right">
        右对齐标题
      </Title>
    </div>
  ),
};

// 颜色方案
export const 颜色方案: Story = {
  args: {
    children: "颜色方案示例",
  },
  render: () => (
    <div className="space-y-4">
      <Title level={3} color="default">
        默认颜色标题
      </Title>
      <Title level={3} color="primary">
        主要颜色标题
      </Title>
      <Title level={3} color="secondary">
        次要颜色标题
      </Title>
      <Title level={3} color="accent">
        强调颜色标题
      </Title>
    </div>
  ),
};
