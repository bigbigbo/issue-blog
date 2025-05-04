import type { Meta, StoryObj } from "@storybook/react";

import { Typography } from "./index";

const meta = {
  title: "组件/Typography/汇总",
  component: Typography.Text,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
} satisfies Meta<typeof Typography.Text>;

export default meta;
type Story = StoryObj<typeof meta>;

export const 排版示例: Story = {
  args: {
    children: "Typography示例",
  },
  render: () => (
    <div className="max-w-2xl space-y-8 p-4">
      <div>
        <Typography.Title level={1}>Typography 排版组件</Typography.Title>
        <Typography.Paragraph size="lg">
          这是一套完整的文本排版组件系统，提供了标题、文本、段落和链接组件，用于构建一致且美观的文本内容。
        </Typography.Paragraph>
      </div>

      <div className="space-y-4">
        <Typography.Title level={2}>标题组件</Typography.Title>
        <div className="space-y-2">
          <Typography.Title level={1}>H1 标题</Typography.Title>
          <Typography.Title level={2}>H2 标题</Typography.Title>
          <Typography.Title level={3}>H3 标题</Typography.Title>
          <Typography.Title level={4}>H4 标题</Typography.Title>
          <Typography.Title level={5}>H5 标题</Typography.Title>
          <Typography.Title level={6}>H6 标题</Typography.Title>
        </div>
      </div>

      <div className="space-y-4">
        <Typography.Title level={2}>文本组件</Typography.Title>
        <div className="space-y-2">
          <Typography.Text>默认文本</Typography.Text>
          <div>
            <Typography.Text variant="primary">主要文本</Typography.Text>
          </div>
          <div>
            <Typography.Text variant="secondary">次要文本</Typography.Text>
          </div>
          <div>
            <Typography.Text variant="success">成功文本</Typography.Text>
          </div>
          <div>
            <Typography.Text variant="warning">警告文本</Typography.Text>
          </div>
          <div>
            <Typography.Text variant="danger">危险文本</Typography.Text>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <Typography.Title level={2}>段落组件</Typography.Title>
        <Typography.Paragraph>
          这是一个默认大小的段落。Typography的段落组件支持多种尺寸和颜色方案，适用于不同场景的长文本内容展示。
          段落组件可以与其他Typography组件组合使用，例如可以在段落中插入
          <Typography.Text variant="primary">强调文本</Typography.Text>和
          <Typography.Link href="#">链接</Typography.Link>。
        </Typography.Paragraph>
        <Typography.Paragraph size="sm" color="muted">
          这是一个小号的、次要颜色的段落，适合展示不那么重要的辅助信息或注释内容。
        </Typography.Paragraph>
        <Typography.Paragraph size="lg">
          这是一个大号段落，适合用于重要内容或引言部分，能够吸引读者的注意力。
        </Typography.Paragraph>
      </div>

      <div className="space-y-4">
        <Typography.Title level={2}>链接组件</Typography.Title>
        <div className="space-y-2">
          <div>
            <Typography.Link href="#">默认链接</Typography.Link>
          </div>
          <div>
            <Typography.Link href="#" variant="subtle">
              次要链接
            </Typography.Link>
          </div>
          <div>
            <Typography.Link href="#" variant="button">
              按钮式链接
            </Typography.Link>
          </div>
          <div>
            <Typography.Link href="#" underline="always">
              总是有下划线的链接
            </Typography.Link>
          </div>
          <div>
            <Typography.Link href="#" underline="none">
              没有下划线的链接
            </Typography.Link>
          </div>
          <div>
            <Typography.Link href="#" external>
              外部链接
            </Typography.Link>
          </div>
        </div>
      </div>
    </div>
  ),
};
