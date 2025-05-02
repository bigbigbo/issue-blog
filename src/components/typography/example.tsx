"use client";

import { Typography } from ".";

/**
 * Typography组件示例
 * 展示了Typography组件的各种用法
 */
export default function TypographyExample() {
  return (
    <div className="space-y-8 p-6">
      {/* Title组件示例 */}
      <div className="space-y-4">
        <div className="border-b pb-2">
          <Typography.Title level={2}>标题组件示例</Typography.Title>
        </div>

        <div className="grid gap-4">
          <Typography.Title level={1}>一级标题 (H1)</Typography.Title>
          <Typography.Title level={2}>二级标题 (H2)</Typography.Title>
          <Typography.Title level={3}>三级标题 (H3)</Typography.Title>
          <Typography.Title level={4}>四级标题 (H4)</Typography.Title>
          <Typography.Title level={5}>五级标题 (H5)</Typography.Title>
          <Typography.Title level={6}>六级标题 (H6)</Typography.Title>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div>
            <Typography.Title level={3} colorScheme="primary">
              主色标题
            </Typography.Title>
          </div>
          <div>
            <Typography.Title level={3} colorScheme="secondary">
              次要色标题
            </Typography.Title>
          </div>
          <div>
            <Typography.Title level={3} colorScheme="accent">
              强调色标题
            </Typography.Title>
          </div>
          <div>
            <Typography.Title level={3} align="center">
              居中标题
            </Typography.Title>
          </div>
        </div>
      </div>

      {/* Text组件示例 */}
      <div className="space-y-4">
        <div className="border-b pb-2">
          <Typography.Title level={2}>文本组件示例</Typography.Title>
        </div>

        <div className="grid gap-4">
          <div>
            <Typography.Text>默认文本样式</Typography.Text>
          </div>
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

        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <div>
            <Typography.Text size="sm">小号文本</Typography.Text>
          </div>
          <div>
            <Typography.Text size="md">中号文本</Typography.Text>
          </div>
          <div>
            <Typography.Text size="lg">大号文本</Typography.Text>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <div>
            <Typography.Text weight="light">轻量文本</Typography.Text>
          </div>
          <div>
            <Typography.Text weight="normal">常规文本</Typography.Text>
          </div>
          <div>
            <Typography.Text weight="medium">中等文本</Typography.Text>
          </div>
          <div>
            <Typography.Text weight="semibold">半粗文本</Typography.Text>
          </div>
          <div>
            <Typography.Text weight="bold">粗体文本</Typography.Text>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div>
            <Typography.Text as="strong">强调文本</Typography.Text>
          </div>
          <div>
            <Typography.Text as="em">斜体文本</Typography.Text>
          </div>
          <div>
            <Typography.Text as="mark">标记文本</Typography.Text>
          </div>
          <div>
            <Typography.Text as="code">代码文本</Typography.Text>
          </div>
          <div>
            <Typography.Text as="del">删除文本</Typography.Text>
          </div>
          <div>
            <Typography.Text as="ins">插入文本</Typography.Text>
          </div>
        </div>
      </div>

      {/* Paragraph组件示例 */}
      <div className="space-y-4">
        <div className="border-b pb-2">
          <Typography.Title level={2}>段落组件示例</Typography.Title>
        </div>

        <div className="grid gap-6">
          <Typography.Paragraph>
            这是一个默认段落。Typography组件提供了一套完整的文本排版解决方案，包括标题、文本、段落和链接组件。
            段落组件适合展示大段文本内容，默认具有合适的行高和最大宽度限制，以提供最佳的阅读体验。
          </Typography.Paragraph>

          <Typography.Paragraph colorScheme="muted" size="sm">
            这是一个小号的次要段落。段落组件支持不同的颜色方案和尺寸，使其能够适应不同的设计需求。
            次要颜色方案通常用于辅助信息或不太重要的内容。
          </Typography.Paragraph>

          <Typography.Paragraph colorScheme="accent" size="lg">
            这是一个大号的强调段落。强调颜色方案可以用来突出显示重要的信息或提示，
            大号尺寸则可以用于引言或摘要等需要更多视觉注意力的内容。
          </Typography.Paragraph>
        </div>
      </div>

      {/* Link组件示例 */}
      <div className="space-y-4">
        <div className="border-b pb-2">
          <Typography.Title level={2}>链接组件示例</Typography.Title>
        </div>

        <div className="grid gap-4">
          <div>
            <Typography.Link href="#default">默认链接</Typography.Link>
          </div>
          <div>
            <Typography.Link href="#subtle" variant="subtle">
              淡色链接
            </Typography.Link>
          </div>
          <div>
            <Typography.Link href="#button" variant="button">
              按钮式链接
            </Typography.Link>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <div>
            <Typography.Link href="#always" underline="always">
              始终下划线
            </Typography.Link>
          </div>
          <div>
            <Typography.Link href="#hover" underline="hover">
              悬停下划线
            </Typography.Link>
          </div>
          <div>
            <Typography.Link href="#none" underline="none">
              无下划线
            </Typography.Link>
          </div>
        </div>

        <div>
          <Typography.Link href="https://example.com" external>
            外部链接（新窗口打开）
          </Typography.Link>
        </div>
      </div>

      {/* 混合使用示例 */}
      <div className="space-y-4">
        <div className="border-b pb-2">
          <Typography.Title level={2}>混合使用示例</Typography.Title>
        </div>

        <div className="space-y-4 rounded-lg border bg-gray-50 p-6 dark:bg-gray-900">
          <Typography.Title level={3} colorScheme="primary">
            使用Typography组件构建完整内容
          </Typography.Title>

          <Typography.Paragraph>
            Typography组件可以轻松地构建结构化的文本内容。例如，你可以使用
            <Typography.Text variant="primary" weight="semibold">
              {" "}
              主要文本{" "}
            </Typography.Text>
            来突出显示关键词，或者使用
            <Typography.Text variant="success"> 成功文本 </Typography.Text>
            表示积极结果。
          </Typography.Paragraph>

          <Typography.Paragraph size="sm" colorScheme="muted">
            如需了解更多信息，请访问我们的
            <Typography.Link href="#documentation" variant="subtle">
              {" "}
              文档中心
            </Typography.Link>
            或者
            <Typography.Link href="#contact" variant="subtle" underline="always">
              {" "}
              联系我们
            </Typography.Link>
            。
          </Typography.Paragraph>

          <div className="pt-2">
            <Typography.Link href="#action" variant="button">
              立即行动
            </Typography.Link>
          </div>
        </div>
      </div>
    </div>
  );
}
