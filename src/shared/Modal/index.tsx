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
