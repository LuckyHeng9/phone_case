import { useState, useRef } from 'react';
import { Rnd } from 'react-rnd';
import AspectRatio from 'react-aspect-ratio';
import cn from 'classnames';

const DesignPage = () => {
  const [imageDimensions, setImageDimensions] = useState({ height: 800, width: 600 });
  const [renderedDimension, setRenderedDimension] = useState({ height: 200, width: 150 });
  const [renderedPosition, setRenderedPosition] = useState({ x: 150, y: 205 });
  const [imageUrl, setImageUrl] = useState(''); // Uploaded image URL
  const [selectedTemplate, setSelectedTemplate] = useState('iPhone 13 Pro Max');

  const containerRef = useRef(null);
  const phoneCaseRef = useRef(null);

  const templates = [
    { name: 'iPhone 13 Pro Max', src: 'src/assets/phone-template.png' },
    { name: 'Samsung Galaxy S23', src: 'src/assets/samsung_s23-template.png' },
    { name: 'Google Pixel 7', src: 'src/assets/phone-template-3.png' },
  ];

  const HandleComponent = () => (
    <div
      style={{
        width: '16px',
        height: '16px',
        backgroundColor: '#3490dc',
        borderRadius: '70%',
      }}
    />
  );

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImageUrl(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="relative mt-20 px-6 mb-20 pb-20">
      <h1 className="text-2xl font-bold text-center mb-8">Design Your Phone Case</h1>

      {/* Main Layout: Design Area and Upload Section */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Design Area */}
        <div
          ref={containerRef}
          className="relative lg:col-span-2 h-[37.5rem] border-2 border-dashed border-gray-300 rounded-lg p-6 flex justify-center items-center overflow-auto"
        >
          <div className="relative w-60 bg-opacity-50 aspect-[890/1831] pointer-events-none ">
            <AspectRatio
              ref={phoneCaseRef}
              ratio={896 / 1831}
              className="relative z-50 aspect-[896/1831] w-full"
            >
              <img
                src={
                  templates.find((template) => template.name === selectedTemplate)?.src
                }
                alt="Phone template"
                className="pointer-events-none z-50 select-none"
              />
            </AspectRatio>

            <div
              className={cn(
                'absolute inset-0 left-[3px] top-px right-[3px] bottom-[5px] rounded-[32px]',
                'bg-blue-500'
              )}
            />
          </div>

          <Rnd
            default={{
              x: 150,
              y: 205,
              height: imageDimensions.height / 4,
              width: imageDimensions.width / 4,
            }}
            onResizeStop={(_, __, ref) => {
              setRenderedDimension({
                height: parseInt(ref.style.height.slice(0, -2)),
                width: parseInt(ref.style.width.slice(0, -2)),
              });
            }}
            onDragStop={(_, data) => {
              const { x, y } = data;
              setRenderedPosition({ x, y });
            }}
            className="absolute z-20 border-[3px] border-primary"
            lockAspectRatio
            resizeHandleComponent={{
              bottomRight: <HandleComponent />,
              bottomLeft: <HandleComponent />,
              topRight: <HandleComponent />,
              topLeft: <HandleComponent />,
            }}
          >
            {imageUrl && (
              <img
                src={imageUrl}
                alt="Uploaded image"
                className="pointer-events-none w-full h-full object-cover"
              />
            )}
          </Rnd>
        </div>

        {/* Right Sidebar: Image Upload and Choose Model */}
        <div className="p-4 border rounded-lg lg:col-span-1 space-y-6">
          {/* Choose Model */}
          <div>
            <h2 className="text-lg font-semibold mb-2">Choose Model</h2>
            <select
              value={selectedTemplate}
              onChange={(e) => setSelectedTemplate(e.target.value)}
              className="w-full p-2 border rounded-md cursor-pointer"
            >
              {templates.map((template) => (
                <option key={template.name} value={template.name}>
                  {template.name}
                </option>
              ))}
            </select>
          </div>

          {/* Image Upload */}
          <div>
            <h2 className="text-lg font-semibold mb-2">Upload Your Image</h2>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="cursor-pointer w-full p-2 border rounded-md"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DesignPage;
