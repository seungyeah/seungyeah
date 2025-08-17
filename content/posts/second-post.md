---
title: "Hello World - Hugo 블로그 시작하기"
date: 2024-01-01
draft: false
tags: ["hugo", "blog", "getting-started"]
series: ["블로그 구축"]
description: "Hugo를 사용하여 정적 블로그를 구축하는 방법을 알아봅니다."
toc: true
---

## 소개

안녕하세요! 이 글에서는 Hugo를 사용하여 정적 블로그를 구축하는 방법에 대해 알아보겠습니다.

## Hugo란?

Hugo는 Go 언어로 작성된 정적 사이트 생성기입니다. 빠른 속도와 간단한 사용법으로 많은 개발자들이 선호하는 도구입니다.

### 주요 특징

- **빠른 속도**: Go 언어의 성능을 활용하여 매우 빠른 빌드 속도
- **간단한 사용법**: 단일 바이너리로 실행 가능
- **다양한 테마**: 수많은 오픈소스 테마 제공
- **마크다운 지원**: 간편한 콘텐츠 작성

## 설치 방법

### 1. Hugo 설치

```bash
# macOS
brew install hugo

# Windows
choco install hugo-extended

# Linux
sudo apt install hugo
```

### 2. 새 사이트 생성

```bash
hugo new site my-blog
cd my-blog
```

### 3. 테마 추가

```bash
git init
git submodule add https://github.com/theNewDynamic/gohugo-theme-ananke.git themes/ananke
echo "theme = 'ananke'" >> config.toml
```

## 첫 번째 포스트 작성

```bash
hugo new posts/my-first-post.md
```

마크다운 파일을 편집하여 콘텐츠를 작성합니다:

```markdown
---
title: "My First Post"
date: 2024-01-01
---

안녕하세요! 이것은 제 첫 번째 포스트입니다.
```

## 로컬 서버 실행

```bash
hugo server -D
```

브라우저에서 `http://localhost:1313`으로 접속하여 결과를 확인할 수 있습니다.

## 배포

### GitHub Pages

```bash
# 빌드
hugo --minify

# public 폴더를 GitHub Pages에 배포
```

### Netlify

Netlify는 자동 배포를 지원합니다. GitHub 저장소와 연결하면 자동으로 빌드하고 배포합니다.

## 결론

Hugo는 정적 블로그를 구축하기에 매우 좋은 도구입니다. 빠른 속도와 간단한 사용법으로 개발자 블로그 구축에 적합합니다.

앞으로 더 많은 기능과 팁을 공유하겠습니다. 감사합니다!
