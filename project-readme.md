# Meliora

> *meliora — the pursuit of better things.*

A real-time voice AI assistant built in Go. Listens, thinks, speaks. Fully local inference for ASR and TTS. Runs on macOS arm64.

---

## What it does

- 🎤 **Listens** via microphone with dynamic noise-floor calibration
- 🧠 **Thinks** via Groq LLM (OpenAi GPT OSS 20B) with tool use — web search, time lookups, more
- 🗣️ **Speaks** via Kokoro TTS (local ONNX, 24kHz) with pipelined sentence synthesis
- ✂️ **Segments** LLM responses into natural sentences before speaking
- ⚡ **Interrupts** — speak over the assistant mid-sentence and it stops

---

## Stack

| Component | Model                         | Where   |
| --------- | ----------------------------- | ------- |
| ASR       | Parakeet CTC 0.6B (ONNX fp32) | Local   |
| LLM       | Qwen3.5 0.8B (ONNX fp16)      | Local   |
| TTS       | Kokoro 82M (ONNX q8f16)       | Local   |
| VAD       | Silero VAD + RMS calibration  | Local   |
| SBD       | SaT sat-1l-sm (ONNX)          | Local   |
| Runtime   | ONNX Runtime 1.24.3           | Bundled |

---

## Requirements

- Go 1.23+
- macOS arm64 (Apple Silicon) — ORT bundled in `onnx-osx/`
- PortAudio
- Groq API key
- Serper API key (web search tool)

---

## Installation

### 1. Clone

```bash
git clone <your-repo-url>
cd meliora
```

### 2. PortAudio

```bash
brew install pkg-config portaudio
```

### 3. Go dependencies

```bash
go mod tidy
```

ONNX Runtime is already bundled under `onnx-osx/` — no separate download needed.

---

## Models

Models are not included in the repo. Download them before running.

### Kokoro TTS

All model variants and voices are available. The project uses `model_q8f16.onnx` with voice `af` by default.

```bash
mkdir -p ./core/llm/kokoro/assets/voices

# Config
wget -O "./core/llm/kokoro/assets/config,json" \
  "https://huggingface.co/hexgrad/Kokoro-82M/resolve/main/config.json"

# Models — download whichever you need (q8f16 recommended)
wget -O ./core/llm/kokoro/assets/model_q8f16.onnx \
  "https://huggingface.co/hexgrad/Kokoro-82M/resolve/main/onnx/model_q8f16.onnx"

# Optional variants
wget -O ./core/llm/kokoro/assets/model.onnx \
  "https://huggingface.co/hexgrad/Kokoro-82M/resolve/main/onnx/model.onnx"
wget -O ./core/llm/kokoro/assets/model_fp16.onnx \
  "https://huggingface.co/hexgrad/Kokoro-82M/resolve/main/onnx/model_fp16.onnx"
wget -O ./core/llm/kokoro/assets/model_uint8.onnx \
  "https://huggingface.co/hexgrad/Kokoro-82M/resolve/main/onnx/model_uint8.onnx"
```

**Voices** — download the ones you want. Default is `af`:

```bash
# Female (American English)
wget -O ./core/llm/kokoro/assets/voices/af.bin \
  "https://huggingface.co/hexgrad/Kokoro-82M/resolve/main/voices/af.bin"
wget -O ./core/llm/kokoro/assets/voices/af_bella.bin \
  "https://huggingface.co/hexgrad/Kokoro-82M/resolve/main/voices/af_bella.bin"
wget -O ./core/llm/kokoro/assets/voices/af_sarah.bin \
  "https://huggingface.co/hexgrad/Kokoro-82M/resolve/main/voices/af_sarah.bin"
wget -O ./core/llm/kokoro/assets/voices/af_heart.bin \
  "https://huggingface.co/hexgrad/Kokoro-82M/resolve/main/voices/af_heart.bin"
wget -O ./core/llm/kokoro/assets/voices/af_nova.bin \
  "https://huggingface.co/hexgrad/Kokoro-82M/resolve/main/voices/af_nova.bin"

# Male (American English)
wget -O ./core/llm/kokoro/assets/voices/am_adam.bin \
  "https://huggingface.co/hexgrad/Kokoro-82M/resolve/main/voices/am_adam.bin"
wget -O ./core/llm/kokoro/assets/voices/am_echo.bin \
  "https://huggingface.co/hexgrad/Kokoro-82M/resolve/main/voices/am_echo.bin"
wget -O ./core/llm/kokoro/assets/voices/am_michael.bin \
  "https://huggingface.co/hexgrad/Kokoro-82M/resolve/main/voices/am_michael.bin"

# Female (British English)
wget -O ./core/llm/kokoro/assets/voices/bf_emma.bin \
  "https://huggingface.co/hexgrad/Kokoro-82M/resolve/main/voices/bf_emma.bin"
wget -O ./core/llm/kokoro/assets/voices/bf_alice.bin \
  "https://huggingface.co/hexgrad/Kokoro-82M/resolve/main/voices/bf_alice.bin"

# Male (British English)
wget -O ./core/llm/kokoro/assets/voices/bm_george.bin \
  "https://huggingface.co/hexgrad/Kokoro-82M/resolve/main/voices/bm_george.bin"
wget -O ./core/llm/kokoro/assets/voices/bm_daniel.bin \
  "https://huggingface.co/hexgrad/Kokoro-82M/resolve/main/voices/bm_daniel.bin"
```

Full voice list: `af`, `af_alloy`, `af_aoede`, `af_bella`, `af_heart`, `af_jessica`, `af_kore`, `af_nicole`, `af_nova`, `af_river`, `af_sarah`, `af_sky`, `am_adam`, `am_echo`, `am_eric`, `am_fenrir`, `am_liam`, `am_michael`, `am_onyx`, `am_puck`, `bf_alice`, `bf_emma`, `bf_isabella`, `bf_lily`, `bm_daniel`, `bm_fable`, `bm_george`, `bm_lewis` — plus Spanish, French, Hindi, Italian, Japanese, Portuguese, and Chinese variants.

> **Note:** The config file is named `config,json` (with a comma) — this is intentional, it matches what the code expects. Don't rename it.

---

### Parakeet ASR

> **Important:** Use `model.onnx` (full fp32). The `model_int8.onnx` variant outputs garbage tokens and does not work.

```bash
mkdir -p ./models/ASR/parakeet-ctc-0.6

# Full model (~2.4GB)
wget -O ./models/ASR/parakeet-ctc-0.6/model.onnx \
  "https://huggingface.co/onnx-community/parakeet-ctc-0.6b-ONNX/resolve/main/onnx/model.onnx"

# External data file — required, model references it at runtime
wget -O ./models/ASR/parakeet-ctc-0.6/model.onnx_data \
  "https://huggingface.co/onnx-community/parakeet-ctc-0.6b-ONNX/resolve/main/onnx/model.onnx_data"

# Tokenizer
wget -O ./models/ASR/parakeet-ctc-0.6/tokenizer.json \
  "https://huggingface.co/onnx-community/parakeet-ctc-0.6b-ONNX/resolve/main/tokenizer.json"
```

---

### Silero VAD

```bash
mkdir -p ./models/VAD

wget -O ./models/VAD/silero_vad.onnx \
  "https://github.com/snakers4/silero-vad/raw/master/src/silero_vad/data/silero_vad.onnx"
```

---

### Sentence Boundary Detection (SaT)

```bash
mkdir -p ./models/SBD

# SentencePiece tokenizer (XLM-RoBERTa)
wget -O ./models/SBD/sentencepiece.bpe.model \
  "https://huggingface.co/xlm-roberta-base/resolve/main/sentencepiece.bpe.model"

# SaT model (sat-1l-sm)
wget -O ./models/SBD/model.onnx \
  "https://huggingface.co/segment-any-text/sat-1l-sm/resolve/main/model.onnx"
```

---

## Environment

```bash
export GROQ_API_KEY=your_groq_key
export SERPER_API_KEY=your_serper_key
```

---

## Run

```bash
make run
```

On startup, select your microphone from the list. Speak. Interrupt the assistant at any time by talking over it.

---

## Build

```bash
# macOS arm64 binary
make build
# Output: ./build/meliora

# Distributable bundle (binary + dylib + assets)
make dist
# Output: ./build/dist/
```

---

## Project structure

```
meliora/
├── main.go                              # entry point — mic, ASR, LLM, TTS loop
│
├── core/
│   ├── onnx_helper.go                   # ORT singleton init
│   ├── input_streaming.go               # PortAudio mic capture
│   ├── mic_select.go                    # interactive mic selector
│   ├── resample.go                      # linear interpolation resampler
│   ├── amplfy_mic.go                    # mic amplification
│   │
│   ├── asr/
│   │   └── parakeet/
│   │       ├── parakeet.go              # Parakeet CTC ONNX inference
│   │       ├── mel.go                   # mel filterbank + global normalization
│   │       └── tokenizer.go             # CTC BPE tokenizer
│   │
│   ├── llm/
│   │   ├── gpt_oss.go                   # GroqGPTChat(), system prompt, tool loop
│   │   ├── gemini.go                    # Gemini session (unused/experimental)
│   │   ├── kokoro/
│   │   │   ├── service.go               # Kokoro ONNX session + SynthesizePhonemes()
│   │   │   ├── config.go                # DefaultConfig()
│   │   │   ├── phonemize.go             # text → IPA phonemes
│   │   │   ├── vocab.go                 # phoneme vocab loader
│   │   │   ├── voice.go                 # voice embedding loader
│   │   │   ├── wav.go                   # WAV encoding utils
│   │   │   ├── build.go                 # build tags
│   │   │   └── assets/                  # models + voices (not in repo — download)
│   │   │       ├── config,json          # Kokoro config (comma in filename — intentional)
│   │   │       ├── model_q8f16.onnx     # recommended model
│   │   │       ├── model.onnx           # full fp32 fallback
│   │   │       └── voices/              # .bin voice embeddings
│   │   └── tools/
│   │       ├── registry.go              # tool registration + dispatch
│   │       ├── web_search.go            # Serper web search
│   │       └── get_time.go              # current time tool
│   │
│   └── modules/
│       ├── silero_vad.go                # Silero VAD + RMS calibration + interrupt detection
│       ├── local_kokoro.go              # LocalKokoroSpeak, LocalKokoroSpeakSentences (pipelined)
│       ├── tts.go                       # PlayFloat32Audio, PlayWAVBytes
│       ├── transcriber_parakeet.go      # VAD loop → Parakeet ASR pipeline
│       ├── transcriber_groq.go          # Groq Whisper transcriber (legacy)
│       ├── transcriber_groq_multiVad.go # multi-VAD Groq transcriber (legacy)
│       ├── custom_vad.go                # custom VAD experiments
│       ├── kokoro.go                    # cloud Kokoro wrapper (legacy)
│       └── orpheus.go                   # Orpheus TTS (experimental)
│
├── local_modules/
│   └── go-sat/                          # patched go-sat (ORT double-init fix)
│
├── onnx-osx/                            # ONNX Runtime 1.24.3 for macOS arm64 (bundled)
│   ├── include/                         # C headers
│   └── lib/                             # libonnxruntime.dylib
│
├── onnx-win-x64/                        # ONNX Runtime for Windows x64 (bundled)
│   ├── include/
│   └── lib/
│
├── models/                              # downloaded models — not in repo
│   ├── ASR/parakeet-ctc-0.6/
│   ├── VAD/
│   └── SBD/
│
├── libonnxruntime.dylib                 # symlink or copy from onnx-osx/lib/
├── Makefile
├── go.mod
├── go.sum
└── README.md
```

---

## Inspiration

From Liora.

---

## Name

*Meliora* — Latin. The motto of the University of Rochester. Ever better. The pursuit of better things.