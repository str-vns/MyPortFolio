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
import { useEffect, useState } from "react";
import { useGetToken } from "@_/hooks/useGitProd";
import { Textarea } from "../../components/ui/textarea";
import { X, Star } from "lucide-react";
import { InputCreate } from "@_/data/InputsData";
import { DropdownMenuCheckboxes } from "../DropDown";
import {
  useGitProdCreate,
  useGitProdUpdate,
  useRemoveImage,
} from "@_/hooks/useGitProd";
import { FileConvertImage } from "@_/hooks/file64Base";
import { useGitProdSingle } from "@_/hooks/useGitProd";

type InputCreateProps = {
  id?: string;
  title: string;
  placeholder: string;
  type: string;
  returnName: string;
  name: string;
  key?: string;
};

interface ModalProps {
  isEdit?: boolean;
  opening?: boolean;
  prodjectId?: string;
  setOpening?: (val: boolean) => void;
  setEdit?: (val: boolean) => void;
}

export const KeyValModal = () => {
  const { isDarkMode } = useDarkMode();
  const colors = useColorsTheme();
  const [keyId, setKeyId] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const { mutateAsync: getToken } = useGetToken();
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

export const ModalCE: React.FC<ModalProps> = ({
  isEdit,
  opening,
  setOpening,
  setEdit,
  prodjectId,
}) => {
  const { isDarkMode } = useDarkMode();
  // const [loading, setLoading] = useState(false);
  const [images, setImages] = useState<(string | { url: string; public_id?: string })[]>([]);
  const [open, setOpen] = useState(false);
  const { mutateAsync: createGit, isPending } = useGitProdCreate();
  const { mutateAsync: updateGit, isPending: isUpdating } = useGitProdUpdate();
  const { mutateAsync: removeImage } = useRemoveImage();
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
    features: [] as string[],
    pLanguages: [] as string[],
    tools: [] as string[],
  });

  const { data: gitProdSingle } = useGitProdSingle(prodjectId ?? "");

  useEffect(() => {
    setOpen(!!opening);
    if (isEdit) {
      setForm({
        title: gitProdSingle?.title || "",
        gitUrl: gitProdSingle?.gitUrl || "",
        category: gitProdSingle?.category || "",
      });
      setFormArea({
        desc: gitProdSingle?.description || "",
        features: gitProdSingle?.features || [],
        pLanguages: gitProdSingle?.pLanguages || [],
        tools: gitProdSingle?.tools || [],
      });
      setImages(gitProdSingle?.images || []);
      setFav(gitProdSingle?.favorite || false);
    } else {
      setForm({
        title: "",
        gitUrl: "",
        category: "",
      });
      setFormArea({
        desc: "",
        features: [],
        pLanguages: [],
        tools: [],
      });
      setImages([]);
      setFav(false);
    }
  }, [opening, isEdit, gitProdSingle]);

  useEffect(() => {
    if (isPending || isUpdating) {
      // setLoading(true);
      const timer = setTimeout(() => {
        // setLoading(false);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [isPending, isUpdating]);

  const handleGitSubmit = async () => {
    try {
      if (!form.title || !form.gitUrl || !form.category || !formArea.desc) {
        console.warn("Please fill all required fields and upload images.");
        return;
      }
      // if (formArea.features.length === 0) {
      //   console.warn("Please add at least one feature.");
      //   return;
      // }
      if (formArea.pLanguages.length === 0) {
        console.warn("Please add at least one programming language.");
        return;
      }
      if (formArea.tools.length === 0) {
        console.warn("Please add at least one tool.");
        return;
      }

      const formDatas = {
        title: form.title,
        gitUrl: form.gitUrl,
        desc: typeof formArea.desc === "string" ? formArea.desc : "",
        category: form.category,
        favorite: String(fav),
        features: Array.isArray(formArea.features) ? formArea.features : [],
        planguages: Array.isArray(formArea.pLanguages)
          ? formArea.pLanguages
          : [],
        tools: Array.isArray(formArea.tools) ? formArea.tools : [],
        images: images.filter((img) =>
          typeof img === "string" ? !img.startsWith("https://") : true
        ),
      };

      if (isEdit && prodjectId) {
        await updateGit({ data: formDatas, project_id: prodjectId })
          .then(() => {
            // setLoading(false);
            setFav(false);
            setOpen(false);
            if (setOpening) setOpening(false);
            if (setEdit) setEdit(false);
          })
          .catch((error: string) => {
            console.error("Error updating git project:", error);
          });
        return;
      } else {
        await createGit(formDatas)
          .then(() => {
            setForm({
              title: "",
              gitUrl: "",
              category: "",
            });
            setFormArea({
              desc: "",
              features: [],
              pLanguages: [],
              tools: [],
            });
            setImages([]);
            // setLoading(false);
            setFav(false);
            setOpen(false);
          })
          .catch((error: string) => {
            console.error("Error creating git project:", error);
          });
      }
    } catch (error) {
      console.error("Error fetching token:", error);
      setForm({
        title: "",
        gitUrl: "",
        category: "",
      });
      setFormArea({
        desc: "",
        features: [],
        pLanguages: [],
        tools: [],
      });
      setImages([]);
    }
  };

  const imageHandlerChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

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
      Promise.all(Array.from(files).map((file) => FileConvertImage(file)))
        .then((base64Array) => {
          setImages((prev) => [...prev, ...base64Array.flat()]);
        })
        .catch((err) => {
          console.error("Error converting images:", err);
        });
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
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
    if (setOpening) setOpening(false);
    if (setEdit) setEdit(false);
    setForm({
      title: "",
      gitUrl: "",
      category: "",
    });
    setFormArea({
      desc: "",
      features: [],
      pLanguages: [],
      tools: [],
    });
    setImages([]);
  };

  return (
    <Dialog
      open={open}
      onOpenChange={(val: boolean) => {
        setOpen(val);
        if (setOpening) setOpening(val);
        if (setEdit) setEdit(false);
      }}
    >
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className={`bg-[${isDarkMode ? "#CF0F47" : "#123458"}] text-[${isDarkMode ? "#FFDEDE" : "#F1EFEC"}]
            hover:bg-[${isDarkMode ? "#FF0B55" : "#D4C9BE"}] hover:text-[${isDarkMode ? "#000000" : "#030303"}]
            `}
          onClick={() => {
            if (setEdit) setEdit(false);
          }}
        >
          Create
        </Button>
      </DialogTrigger>
      <DialogContent
        className={`bg-[${isDarkMode ? "#CF0F47" : "#123458"}] text-[${isDarkMode ? "#FFDEDE" : "#F1EFEC"}]`}
      >
        <DialogHeader>
          <DialogTitle>
            <div
              className="flex items-center gap-2"
              onClick={() => setFav(!fav)}
            >
              <Star
                className="mb-2"
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
            <span className="font-bold text-center">Create</span>
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
                      isCategory={form?.category}
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
                        if (arr.length < 10) {
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
              {images.map((image, idx: number) => {
                const src =
                  typeof image === "string" ? image : image?.url || "";
                return (
                  <div
                    key={idx}
                    className="flex flex-col items-center min-w-[130px] gap-2 relative"
                  >
                    <img
                      src={src}
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
                        if (typeof image !== "string") {
                          removeImage({
                            project_id: prodjectId ?? "",
                            public_id: image.public_id ?? "",
                          });
                        }
                        setImages((prev) => prev.filter((_, i) => i !== idx));
                      }}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                );
              })}
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
            disabled={isPending || isUpdating}
          >
            {isPending || isUpdating ? "Submitting..." : "Submit"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
