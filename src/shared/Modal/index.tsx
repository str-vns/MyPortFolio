import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@_/components/ui/dialog";
import { Button } from "@_/components/ui/button";
import { Input } from "@_/components/ui/input";
import { Label } from "@_/components/ui/label";
import { useDarkMode } from "@_/stores/useDarkMode";
import { useColorsTheme } from "../colors";
import { useState } from "react";
import { useGetToken } from "@_/hooks/useGitProd";
import { Textarea } from "../../components/ui/textarea";
import { X, Star } from "lucide-react";
import { InputCreate } from "@_/data/InputsData";
import { DropdownMenuCheckboxes } from "../DropDown"; 

interface InputCreateProps {
  id: string;
  title: string;
  placeholder: string;
  type: string;
  returnName: string;
  name: string;
}

export const KeyValModal = () => {
  const { isDarkMode } = useDarkMode();
  const colors = useColorsTheme();
  const [keyId, setKeyId] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [open, setOpen] = useState(false);
  const {
    mutateAsync: getToken,
    isPending,
    isSuccess,
    isError,
  } = useGetToken();
  const handleKeyIdChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setKeyId(e.target.value);
  };

  const handleKeyIdSubmit = async () => {
    setLoading(true);
    try {
      await getToken({ keyId });
      setTimeout(() => {
        setLoading(false);
        setKeyId("");
        setOpen(false);
      }, 2000);
    } catch (error) {
      console.error("Error fetching token:", error);
      setKeyId("");
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className={`bg-[${isDarkMode ? "#CF0F47" : "#123458"}] text-[${isDarkMode ? "#FFDEDE" : "#F1EFEC"}]
            hover:bg-[${isDarkMode ? "#FF0B55" : "#D4C9BE"}] hover:text-[${isDarkMode ? "#000000" : "#030303"}]
            `}
        >
          KEY ID
        </Button>
      </DialogTrigger>
      <DialogContent
        className="sm:max-w-md"
        style={{ backgroundColor: colors.SEMIBLACK, color: colors.LIGHTGREY }}
      >
        <DialogHeader>
          <DialogTitle>Enter KEY ID</DialogTitle>
          <DialogDescription>
            Anyone who has this KEY ID Enter.
          </DialogDescription>
        </DialogHeader>
        <div className="flex items-center gap-2">
          <div className="grid flex-1 gap-2">
            <Input
              id="link"
              placeholder="Enter KEY ID"
              value={keyId}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                handleKeyIdChange(e)
              }
            />
          </div>
        </div>
        <DialogFooter className="sm:justify-start gap-10">
          <DialogClose asChild>
            <Button
              type="button"
              variant="secondary"
              className={`bg-[${isDarkMode ? "#CF0F47" : "#123458"}] text-[${isDarkMode ? "#FFDEDE" : "#F1EFEC"}]
            hover:bg-[${isDarkMode ? "#FF0B55" : "#D4C9BE"}] hover:text-[${isDarkMode ? "#000000" : "#030303"}]`}
            >
              Close
            </Button>
          </DialogClose>
          <Button
            type="button"
            variant="secondary"
            className={`bg-[${isDarkMode ? "#CF0F47" : "#123458"}] text-[${isDarkMode ? "#FFDEDE" : "#F1EFEC"}]
            hover:bg-[${isDarkMode ? "#FF0B55" : "#D4C9BE"}] hover:text-[${isDarkMode ? "#000000" : "#030303"}]`}
            onClick={handleKeyIdSubmit}
            disabled={loading}
          >
            {loading ? "Submitting..." : "Submit"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export const ModalCE = () => {
  const { isDarkMode } = useDarkMode();
  const [keyId, setKeyId] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [images, setImages] = useState<string[]>([]);
  const [open, setOpen] = useState(false);
  const [fav, setFav] = useState<boolean>(false);
  const [form, setForm] = useState<{ [key: string]: string }>({
    title: "",
    gitUrl: "",
    category: "",
  });

  const [formArea, setFormArea] = useState<{
    [key: string]: string | string[];
  }>({
    desc: "",
    features: [],
    pLanguages: [],
    tools: [],
  });

  const {
    mutateAsync: getToken,
    isPending,
    isSuccess,
    isError,
  } = useGetToken();

 
  const handleGitSubmit = async () => {
    setLoading(true);
    try {
      const formDatas = {
        title: form.title,
        gitUrl: form.gitUrl,
        desc: formArea.desc,
        category: form.category,
        favorite: fav,
        features: Array.isArray(formArea.features)
          ? formArea.features.join(", ")
          : "",
        pLanguages: Array.isArray(formArea.pLanguages)
          ? formArea.pLanguages.join(", ")
          : "",
        tools: Array.isArray(formArea.tools)
          ? formArea.tools.join(", ")
          : "",
        images: images,
      }

      await getToken({ keyId });
      setTimeout(() => {
        setLoading(false);
        setKeyId("");
        setOpen(false);
      }, 2000);

    } catch (error) {
      console.error("Error fetching token:", error);
      setKeyId("");
      setLoading(false);
    }
  };

  const imageHandlerChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;
    console.log(images);
    if (images.length >= 4) {
      console.warn("You can only upload up to 4 images at a time.");
      return;
    }

    const totalSize = Array.from(files).reduce(
      (acc, file) => acc + file.size,
      0
    );
    if (totalSize > 2 * 1024 * 1024) {
      console.warn("Total file size exceeds 3MB limit.");
      return;
    }

    if (files) {
      const fileArray = Array.from(files).map((file) =>
        URL.createObjectURL(file)
      );
      setImages((prev) => [...prev, ...fileArray]);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    console.log(id, value);
    setForm((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const handleTextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setFormArea((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const closeModal = () => {
    setOpen(false);
    setForm({
      title: "",
      gitUrl: "",
    });
    setFormArea({
      desc: "",
    });
    setImages([]);
  };
console.log("Form Data:", form);
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className={`bg-[${isDarkMode ? "#CF0F47" : "#123458"}] text-[${isDarkMode ? "#FFDEDE" : "#F1EFEC"}]
            hover:bg-[${isDarkMode ? "#FF0B55" : "#D4C9BE"}] hover:text-[${isDarkMode ? "#000000" : "#030303"}]
            `}
        >
          Create
        </Button>
      </DialogTrigger>
      <DialogContent
        className={`bg-[${isDarkMode ? "#CF0F47" : "#123458"}] text-[${isDarkMode ? "#FFDEDE" : "#F1EFEC"}]`}
      >
        <DialogHeader>
          <DialogTitle>
            {" "}
            <div
              className="flex items-center gap-2"
              onClick={() => setFav(!fav)}
            >
              <Star
                size={20}
                stroke="none"
                fill={
                  fav
                    ? isDarkMode
                      ? "#FFDEDE"
                      : "#000"
                    : isDarkMode
                      ? "#000"
                      : "#F1EFEC"
                }
              />
            </div>
            <span>Create</span>
          </DialogTitle>
          <DialogDescription> Add your Git Projects</DialogDescription>
        </DialogHeader>

        <div className="flex flex-col items-center gap-2 overflow-auto overflow-y-scroll max-h-[500px] no-scrollbar">
          {InputCreate.map((input: InputCreateProps, index: number) => (
            <div key={index} className="w-full">
              {input.type === "text" && (
                <div className="grid gap-1 w-full">
                  <Label htmlFor={input.name} className="text-sm">
                    {input.title}
                  </Label>
                  <Input
                    id={input.name}
                    placeholder={input.placeholder}
                    className={`bg-black text-[${isDarkMode ? "#FFDEDE" : "#F1EFEC"}]`}
                    value={form[input.name] || ""}
                    onChange={handleInputChange}
                  />
                </div>
              )}
              {input.type === "dropdown" && (
                <div className="grid flex-1 gap-2 w-full  "> 
                  <Label htmlFor={input.name} className="text-sm">
                    {input.title}
                  </Label>
                  <div className="flex items-center justify-center ">
                <DropdownMenuCheckboxes
                  isDarkMode={isDarkMode}
                  returnVal={(selected: string) => {
                    setForm((prev) => ({
                      ...prev,
                      [input.name]: selected,
                    }));  
                  }}
                />
                </div>
                </div>
              )}

              {input.type === "textarea" && (
                <div className="grid flex-1 gap-2 w-full">
                  <Label htmlFor={input.name} className="text-sm">
                    {input.title}
                  </Label>
                  <Textarea
                    id={input.name}
                    placeholder="Enter Description"
                    className={`bg-black text-[${isDarkMode ? "#FFDEDE" : "#F1EFEC"}]`}
                    value={formArea[input.name] || ""}
                    onChange={handleTextareaChange}
                  />
                </div>
              )}

              {input.type === "textareaADD" && (
                <div className="grid flex-1 gap-2 w-full">
                  <Label htmlFor={input.name} className="text-sm">
                    {input.title}
                  </Label>
                  {Array.isArray(formArea[input.name]) &&
                    (formArea[input.name] as string[]).map(
                      (feature: string, idx: number) => (
                        <div key={idx} className="flex items-center gap-2 mb-2">
                          <Textarea
                            id={`${input.name}-${idx}`}
                            placeholder={input.placeholder}
                            value={feature}
                            className={`bg-black text-[${isDarkMode ? "#FFDEDE" : "#F1EFEC"}]`}
                            onChange={(e) => {
                              const value = e.target.value;
                              setFormArea((prev) => ({
                                ...prev,
                                [input.name]: Array.isArray(prev[input.name])
                                  ? (prev[input.name] as string[]).map(
                                      (f, i) => (i === idx ? value : f)
                                    )
                                  : [],
                              }));
                            }}
                          />
                          <Button
                            type="button"
                            variant="outline"
                            className={`bg-black text-[${isDarkMode ? "#FFDEDE" : "#F1EFEC"}]
              hover:bg-[${isDarkMode ? "#FF0B55" : "#D4C9BE"}] hover:text-[${isDarkMode ? "#000000" : "#030303"}]`}
                            onClick={() => {
                              setFormArea((prev) => ({
                                ...prev,
                                [input.name]: Array.isArray(prev[input.name])
                                  ? (prev[input.name] as string[]).filter(
                                      (_, i) => i !== idx
                                    )
                                  : [],
                              }));
                            }}
                          >
                            <X className="h-4 w-4 " />
                          </Button>
                        </div>
                      )
                    )}
                  <Button
                    type="button"
                    variant="outline"
                    className={`bg-black text-[${isDarkMode ? "#FFDEDE" : "#F1EFEC"}]
    hover:bg-[${isDarkMode ? "#FF0B55" : "#D4C9BE"}] hover:text-[${isDarkMode ? "#000000" : "#030303"}]`}
                    onClick={() => {
                      setFormArea((prev) => {
                        const arr = Array.isArray(prev[input.name])
                          ? (prev[input.name] as string[])
                          : [];
                        if (arr.length < 5) {
                          return {
                            ...prev,
                            [input.name]: [...arr, ""],
                          };
                        }
                        return prev;
                      });
                    }}
                  >
                    Add {input.title}
                  </Button>
                </div>
              )}
            </div>
          ))}

          <div className="grid flex-1 gap-2 w-full ">
            <Label htmlFor="images" className="text-sm">
              Images
            </Label>

            <input
              type="file"
              accept="image/*"
              id="images"
              onChange={imageHandlerChange}
              multiple
              className="hidden  "
            />

            <label
              htmlFor="images"
              className={`
      cursor-pointer px-4 py-2 text-sm rounded-md text-center
      bg-black
      text-[${isDarkMode ? "#FFDEDE" : "#F1EFEC"}]
      hover:bg-[${isDarkMode ? "#FF0B55" : "#D4C9BE"}]
      hover:text-[${isDarkMode ? "#000000" : "#030303"}]
      w-1/2 
    `}
            >
              Add Image
            </label>
          </div>

          <div className="w-full">
            <div className="flex flex-row gap-2 mt-2 overflow-x-auto max-h-[140px] items-start pb-2">
              {images.map((image, idx) => (
                <div
                  key={idx}
                  className="flex flex-col items-center min-w-[130px] gap-2 relative"
                >
                  <img
                    src={image}
                    alt={`Uploaded ${idx + 1}`}
                    className="w-[120px] h-[120px] object-cover rounded-md"
                  />
                  <Button
                    type="button"
                    variant="outline"
                    className={`
            bg-black
            text-[${isDarkMode ? "#FFDEDE" : "#F1EFEC"}]
            hover:bg-[${isDarkMode ? "#FF0B55" : "#D4C9BE"}]
            hover:text-[${isDarkMode ? "#000000" : "#030303"}]
            w-fit absolute top-2 right-2 h-7 w-7 rounded-full
          `}
                    onClick={() => {
                      setImages((prev) => prev.filter((_, i) => i !== idx));
                    }}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          </div>
        </div>

        <DialogFooter className="sm:justify-start gap-5 items-center flex flex-row">
          <DialogClose asChild>
            <Button
              type="button"
              variant="secondary"
              className={`bg-black text-[${isDarkMode ? "#FFDEDE" : "#F1EFEC"}]
            hover:bg-[${isDarkMode ? "#FF0B55" : "#D4C9BE"}] hover:text-[${isDarkMode ? "#000000" : "#030303"}]`}
              onClick={() => {
                closeModal();
              }}
            >
              Close
            </Button>
          </DialogClose>
          <Button
            type="button"
            variant="secondary"
            className={`bg-black text-[${isDarkMode ? "#FFDEDE" : "#F1EFEC"}]
            hover:bg-[${isDarkMode ? "#FF0B55" : "#D4C9BE"}] hover:text-[${isDarkMode ? "#000000" : "#030303"}]`}
            onClick={handleGitSubmit}
            disabled={loading}
          >
            {loading ? "Submitting..." : "Submit"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
