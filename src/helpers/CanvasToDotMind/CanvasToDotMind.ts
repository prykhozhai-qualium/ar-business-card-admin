import "./compiler/Compiler.js";

const compiler: any = new (window as any).MINDAR.IMAGE.Compiler();

export default ({
  canvas,
  progress_cb,
  on_compile,
}: {
  canvas: HTMLCanvasElement;
  progress_cb: (progress: number) => void;
  on_compile: (buffer: any) => void;
}) => {
  const download = (buffer: any) => {
    on_compile(buffer);
    var blob = new Blob([buffer]);
    // var aLink = window.document.createElement("a");
    // aLink.download = "targets.mind";
    // aLink.href = window.URL.createObjectURL(blob);
    // aLink.click();
    // window.URL.revokeObjectURL(aLink.href);
  };

  const loadImage = async (file: File) => {
    const img = new Image();

    return new Promise((resolve, reject) => {
      let img = new Image();
      img.onload = () => resolve(img);
      img.onerror = reject;
      img.src = URL.createObjectURL(file);
    });
  };

  const compileFiles = async (files: File[]) => {
    const images = [];
    for (let i = 0; i < files.length; i++) {
      images.push(await loadImage(files[i]));
    }

    const dataList = await compiler.compileImageTargets(
      images,
      (progress: number) => {
        progress_cb(progress);
      }
    );

    const exportedBuffer = await compiler.exportData();
    download(exportedBuffer);
  };

  canvas.toBlob((b) => {
    const fd = new FormData();
    fd.set("file", b as Blob);
    let file = fd.get("file");
    compileFiles([file as File]);
  });
};
