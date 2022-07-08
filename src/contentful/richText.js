import Image from 'next/image';
import { BLOCKS } from '@contentful/rich-text-types';

// * Rich Text Rendering:
// Contentful rich text rendering config:
export const renderOptions = {
  renderNode: {
    [BLOCKS.EMBEDDED_ASSET]: (node, children) => {
      return (
        <Image
        src={`https://${node.data.target.fields.file.url}`}
        height={node.data.target.fields.file.details.image.height}
        width={node.data.target.fields.file.details.image.width}
        alt="temp"
        />
      )
    }
  }
}