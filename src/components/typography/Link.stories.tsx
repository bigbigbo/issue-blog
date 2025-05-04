import type { Meta, StoryObj } from "@storybook/react";

import Link from "./link";

const meta = {
  title: "组件/Typography/Link",
  component: Link,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
  argTypes: {
    variant: {
      control: "select",
      options: ["default", "subtle", "button"],
      description: "链接样式变体",
    },
    underline: {
      control: "select",
      options: ["always", "hover", "none"],
      description: "下划线显示方式",
    },
    href: {
      control: "text",
      description: "链接地址",
    },
    external: {
      control: "boolean",
      description: "是否为外部链接",
    },
    children: {
      control: "text",
      description: "链接文本内容",
    },
  },
} satisfies Meta<typeof Link>;

export default meta;
type Story = StoryObj<typeof meta>;

// 基础链接样式
export const 基础: Story = {
  args: {
    children: "点击这里访问",
    href: "#",
  },
};

// 链接变体
export const 变体: Story = {
  args: {
    children: "链接变体示例",
  },
  render: () => (
    <div className="space-y-6">
      <div>
        <Link variant="default" href="#">
          默认链接
        </Link>
      </div>
      <div>
        <Link variant="subtle" href="#">
          次要链接
        </Link>
      </div>
      <div>
        <Link variant="button" href="#">
          按钮式链接
        </Link>
      </div>
    </div>
  ),
};

// 下划线样式
export const 下划线: Story = {
  args: {
    children: "下划线样式示例",
  },
  render: () => (
    <div className="space-y-6">
      <div>
        <Link href="#" underline="always">
          总是显示下划线
        </Link>
      </div>
      <div>
        <Link href="#" underline="hover">
          悬停时显示下划线（默认）
        </Link>
      </div>
      <div>
        <Link href="#" underline="none">
          不显示下划线
        </Link>
      </div>
    </div>
  ),
};

// 外部链接
export const 外部链接: Story = {
  args: {
    children: "外部链接示例",
    href: "https://github.com",
    external: true,
  },
};

// 组合使用
export const 组合样式: Story = {
  args: {
    children: "组合样式示例",
  },
  render: () => (
    <div className="space-y-6">
      <div>
        <Link href="#" variant="default" underline="always">
          默认样式总是显示下划线
        </Link>
      </div>
      <div>
        <Link href="#" variant="subtle" underline="none">
          次要样式不显示下划线
        </Link>
      </div>
      <div>
        <Link href="https://github.com" variant="button" external>
          外部按钮式链接
        </Link>
      </div>
    </div>
  ),
};
