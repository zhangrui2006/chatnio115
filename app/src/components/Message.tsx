import { Message } from "@/conversation/types.ts";
import Markdown from "@/components/Markdown.tsx";
import {
  Cloud,
  CloudFog,
  Copy,
  File,
  Loader2,
  MousePointerSquare,
  Power,
  RotateCcw,
  ScanText,
} from "lucide-react";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from "@/components/ui/context-menu.tsx";
import { filterMessage } from "@/utils/processor.ts";
import {
  copyClipboard,
  saveAsFile,
  getSelectionTextInArea,
  useInputValue,
} from "@/utils/dom.ts";
import { useTranslation } from "react-i18next";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip.tsx";
import { Ref, useRef, useState } from "react";

type MessageProps = {
  message: Message;
  end?: boolean;
  onEvent?: (event: string) => void;
  ref?: Ref<HTMLElement>;
};

function MessageSegment(props: MessageProps) {
  const [copied, setCopied] = useState<string>("");
  const { t } = useTranslation();
  const ref = useRef(null);
  const { message } = props;

  function updateSelection(): void {
    if (ref.current) setCopied(getSelectionTextInArea(ref.current));
  }

  return (
    <ContextMenu onOpenChange={updateSelection}>
      <ContextMenuTrigger asChild>
        <div className={`message ${message.role}`} ref={ref}>
          <MessageContent {...props} />
          {message.quota && message.quota !== 0 ? (
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <div className={`message-quota`}>
                    <Cloud className={`h-4 w-4 icon`} />
                    <span className={`quota`}>
                      {(message.quota < 0 ? 0 : message.quota).toFixed(2)}
                    </span>
                  </div>
                </TooltipTrigger>
                <TooltipContent className={`icon-tooltip`}>
                  <CloudFog className={`h-4 w-4 mr-2`} />
                  <p>{t("quota-description")}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          ) : null}
        </div>
      </ContextMenuTrigger>
      <ContextMenuContent>
        {copied.length > 0 && (
          <ContextMenuItem onClick={() => copyClipboard(copied)}>
            <ScanText className={`h-4 w-4 mr-2`} /> {t("message.copy-area")}
          </ContextMenuItem>
        )}
        <ContextMenuItem
          onClick={() => copyClipboard(filterMessage(message.content))}
        >
          <Copy className={`h-4 w-4 mr-2`} /> {t("message.copy")}
        </ContextMenuItem>
        <ContextMenuItem
          onClick={() =>
            saveAsFile(
              `message-${message.role}.txt`,
              filterMessage(message.content),
            )
          }
        >
          <File className={`h-4 w-4 mr-2`} /> {t("message.save")}
        </ContextMenuItem>
        <ContextMenuItem
          onClick={() => useInputValue("input", filterMessage(message.content))}
        >
          <MousePointerSquare className={`h-4 w-4 mr-2`} /> {t("message.use")}
        </ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  );
}

function MessageContent({ message, end, onEvent }: MessageProps) {
  return (
    <div className={`content-wrapper`}>
      <div className={`message-content`}>
        {message.keyword && message.keyword.length ? (
          <div className={`bing`}>
            <svg
              width="256px"
              height="388px"
              viewBox="0 0 256 388"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              xmlnsXlink="http://www.w3.org/1999/xlink"
              preserveAspectRatio="xMidYMid"
            >
              <title>bing</title>
              <defs>
                <radialGradient
                  cx="93.7173476%"
                  cy="77.8181394%"
                  fx="93.7173476%"
                  fy="77.8181394%"
                  r="143.12136%"
                  gradientTransform="translate(0.937173,0.778181),scale(1.000000,0.719543),rotate(-130.909000),translate(-0.937173,-0.778181)"
                  id="bingRadialGradient-1"
                >
                  <stop stopColor="#00CACC" offset="0%"></stop>
                  <stop stopColor="#048FCE" offset="100%"></stop>
                </radialGradient>
                <radialGradient
                  cx="13.8926614%"
                  cy="71.4480037%"
                  fx="13.8926614%"
                  fy="71.4480037%"
                  r="150.086127%"
                  gradientTransform="translate(0.138927,0.714480),scale(0.600049,1.000000),rotate(-23.195400),translate(-0.138927,-0.714480)"
                  id="bingRadialGradient-2"
                >
                  <stop stopColor="#00BBEC" offset="0%"></stop>
                  <stop stopColor="#2756A9" offset="100%"></stop>
                </radialGradient>
                <linearGradient
                  x1="50.0002111%"
                  y1="-3.51563173e-08%"
                  x2="50.0002111%"
                  y2="99.9999984%"
                  id="bingLinearGradient-3"
                >
                  <stop stopColor="#00BBEC" offset="0%"></stop>
                  <stop stopColor="#2756A9" offset="100%"></stop>
                </linearGradient>
              </defs>
              <g>
                <path
                  d="M129.424369,122.046918 C122.29107,122.875748 116.850956,128.668861 116.345268,135.974502 C116.127195,139.122391 116.195602,139.335928 123.330791,157.696785 C139.564206,199.470843 143.497083,209.524887 144.158483,210.939907 C145.760962,214.366717 148.01426,217.590572 150.829558,220.484105 C152.989881,222.704521 154.414727,223.898444 156.824493,225.508104 C161.059724,228.33663 163.161466,229.118595 179.641677,233.998219 C195.695191,238.75161 204.46574,241.910837 212.02347,245.661923 C221.814465,250.521516 228.645788,256.049313 232.966812,262.608139 C236.06708,267.314287 238.812837,275.75338 240.007515,284.248408 C240.474653,287.569017 240.477677,294.909429 240.013185,297.911432 C239.00521,304.426794 236.991907,309.886561 233.912048,314.455516 C232.274042,316.885312 232.843981,316.478646 235.225401,313.517461 C241.964883,305.138083 248.830221,290.816683 252.333376,277.8298 C256.572764,262.112277 257.149506,245.234469 253.992924,229.259946 C247.845679,198.151822 228.207374,171.305385 200.548737,156.199752 C198.810955,155.250359 192.191658,151.780841 183.217776,147.115133 C181.856046,146.406867 179.999212,145.437443 179.091392,144.960857 C178.183573,144.483892 176.326738,143.514468 174.965009,142.806581 C173.603279,142.098693 169.683253,140.056288 166.253797,138.268239 C162.82434,136.479812 158.987083,134.478981 157.726265,133.821738 C153.882961,131.817883 151.304255,130.471649 149.381658,129.465187 C140.489411,124.810061 136.725475,122.928282 135.652494,122.601739 C134.52698,122.259322 131.66784,121.819775 130.950504,121.878734 C130.799326,121.891206 130.112604,121.966794 129.424369,122.046918 Z"
                  fill="url(#bingRadialGradient-1)"
                ></path>
                <path
                  d="M148.810208,277.993827 C148.31737,278.285599 147.625734,278.70814 147.272735,278.93226 C146.919358,279.156758 146.135504,279.643927 145.530417,280.015445 C143.309245,281.378686 137.401993,285.018657 132.325839,288.152183 C128.989734,290.211596 128.494629,290.518486 124.256752,293.148592 C122.743468,294.087403 121.134186,295.076858 120.680276,295.347465 C120.226366,295.618073 118.28714,296.812373 116.37059,298.001382 C114.45404,299.190013 111.111889,301.253583 108.943251,302.586589 C106.774613,303.919216 102.895782,306.311974 100.323879,307.903493 C97.751598,309.494634 94.3678729,311.581258 92.8047,312.5401 C91.2411491,313.498564 89.7970283,314.424524 89.5952066,314.597622 C89.2954977,314.854624 75.3902128,323.468326 68.413004,327.719053 C63.1138629,330.947066 56.9836248,333.106255 50.7082565,333.95436 C47.7867558,334.348932 42.2582032,334.350444 39.3450173,333.956627 C31.445665,332.890072 24.1685583,329.944005 17.9362755,325.290768 C15.4916258,323.465303 10.8891851,318.866491 9.12970847,316.49074 C4.9833696,310.893024 2.30102759,304.888641 0.91181812,298.094734 C0.59216513,296.531183 0.289753151,295.211028 0.240053625,295.160383 C0.110210494,295.029237 0.344758621,297.391004 0.76784823,300.4788 C1.20781187,303.690183 2.14533768,308.335104 3.15510733,312.307665 C10.9691579,343.051452 33.2044235,368.056927 63.3054801,379.953822 C71.9732286,383.377987 80.7199673,385.536043 90.2369541,386.594284 C93.8130523,386.994903 103.935504,387.153639 107.667693,386.870182 C124.783605,385.573837 139.68666,380.535855 154.975217,370.873738 C156.336946,370.013161 158.895243,368.4001 160.660238,367.288569 C162.42561,366.177416 164.653585,364.764664 165.612049,364.149751 C166.570135,363.534459 167.725507,362.807675 168.179417,362.5348 C168.633327,362.261547 169.541146,361.69123 170.196878,361.2668 C170.852609,360.842748 173.658459,359.067927 176.432184,357.322963 L187.52406,350.317031 L191.332593,347.911423 L191.469787,347.824874 L191.889304,347.559936 L192.088858,347.433703 L194.892818,345.662661 L204.583281,339.541871 C216.930684,331.783076 220.612606,329.05924 226.349027,323.439981 C228.740652,321.097867 232.34623,317.099228 232.525375,316.591651 C232.561657,316.488472 233.202649,315.499773 233.949465,314.394667 C236.985104,309.902812 239.009368,304.400338 240.013185,297.911432 C240.477677,294.909429 240.474653,287.569017 240.007515,284.248408 C239.104609,277.828288 237.053134,270.546079 234.84141,265.909094 C231.21429,258.305634 223.48762,251.396833 212.387807,245.832753 C209.323066,244.296414 206.15817,242.890466 205.804793,242.908804 C205.637364,242.917678 195.308177,249.231218 182.851171,256.939747 C170.394164,264.648276 159.582722,271.339004 158.826458,271.808409 C158.069815,272.278192 156.770069,273.072251 155.937838,273.572648 L148.810208,277.993827 Z"
                  fill="url(#bingRadialGradient-2)"
                ></path>
                <path
                  d="M0.0533481895,241.013222 L0.106718678,294.701938 L0.801609893,297.819592 C2.97446184,307.567124 6.73918016,314.594977 13.2839464,321.122433 C16.3624068,324.192844 18.7164636,326.044009 22.0524167,328.018006 C29.1114124,332.195412 36.7087125,334.256336 45.0304163,334.252562 C53.7461636,334.248021 61.2857518,332.074092 69.0551294,327.325236 C70.3662143,326.523997 75.5035957,323.360991 80.4712807,320.296249 L89.5033664,314.724233 L89.5033664,251.024559 L89.5033664,187.324884 L89.5007208,129.051339 C89.4988311,91.8738258 89.4308013,69.7947641 89.313261,68.0626506 C88.5724924,57.1775095 84.020167,47.1707083 76.3653061,39.6016406 C74.0160114,37.2786885 72.0087553,35.7271562 66.0289385,31.6121866 C63.053392,29.5643772 57.6064751,25.8130645 53.9249307,23.2760076 C50.2433864,20.7387618 44.1777765,16.5590127 40.4455878,13.9874496 C36.7134746,11.4160755 31.3904475,7.74730564 28.6166092,5.83487543 C22.8380472,1.85062504 22.3858004,1.57350956 20.6389849,0.948501166 C18.366904,0.13569962 15.9591415,-0.162861118 13.6700153,0.0843541512 C6.99810902,0.80490922 1.65713716,5.62213122 0.268845335,12.1713194 C0.0528069748,13.1902541 0.013004155,26.7505903 0.0102532201,100.349957 L0.00714146286,187.324884 L0,187.324884 L0.0533481895,241.013222 Z"
                  fill="url(#bingLinearGradient-3)"
                ></path>
              </g>
            </svg>
            <span className={`keyword`}>{message.keyword}</span>
          </div>
        ) : null}
        {message.content.length ? (
          <Markdown children={message.content} />
        ) : (
          <Loader2 className={`h-5 w-5 m-1 animate-spin`} />
        )}
      </div>
      {message.role === "assistant" && end === true && (
        <div className={`message-toolbar`}>
          {message.end !== false ? (
            <RotateCcw
              className={`h-4 w-4 m-0.5`}
              onClick={() => onEvent && onEvent("restart")}
            />
          ) : (
            <Power
              className={`h-4 w-4 m-0.5`}
              onClick={() => onEvent && onEvent("stop")}
            />
          )}
        </div>
      )}
    </div>
  );
}

export default MessageSegment;
