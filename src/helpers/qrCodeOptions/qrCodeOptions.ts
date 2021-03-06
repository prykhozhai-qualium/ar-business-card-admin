const qrCodeOptions = (type: any, link: string) => {
  return {
    width: 150,
    height: 150,
    type,
    data: link,
    image: "./assets/logo.svg",
    dotsOptions: {
      color: "#000",
      gradient: {
        type: "linear",
        rotation: Math.PI / 4,
        colorStops: [
          {
            offset: -50,
            color: "#61CDFF",
          },
          {
            offset: 100,
            color: "#FFF",
          },
        ],
      },
      type: "extra-rounded",
    },
    backgroundOptions: {
      color: undefined,
    },
    imageOptions: {
      crossOrigin: "anonymous",
      margin: 4,
    },
  };
};

export default qrCodeOptions;
