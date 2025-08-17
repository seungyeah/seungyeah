---
title: "Rust 소개 및 환경 설정2"
date: 2024-01-02
draft: false
tags: ["rust", "programming", "systems", "tutorial"]
series: ["Rust 완벽 가이드"]
description: "Rust 언어를 소개하고 개발 환경을 설정하는 방법을 알아봅니다."
toc: true
---

## 소개

안녕하세요! Rust 완벽 가이드 시리즈의 첫 번째 글입니다. 이 글에서는 Rust 언어에 대한 기본적인 소개와 개발 환경 설정 방법에 대해 알아보겠습니다.

## Rust란?

Rust는 Mozilla에서 개발한 시스템 프로그래밍 언어입니다. 2010년에 처음 공개되었으며, 2015년에 1.0 버전이 릴리스되었습니다.

### Rust의 특징

- **메모리 안전성**: 컴파일 타임에 메모리 관련 버그를 방지
- **동시성 안전성**: 데이터 레이스 없이 안전한 동시성 프로그래밍
- **제로 코스트 추상화**: 고수준 추상화가 런타임 오버헤드 없음
- **C/C++ 수준의 성능**: 시스템 프로그래밍에 적합한 성능

## 왜 Rust를 배워야 할까?

### 1. 메모리 안전성

```rust
fn main() {
    let mut v = vec![1, 2, 3];
    let first = &v[0];  // 불변 참조
    v.push(4);          // 컴파일 에러! 가변 참조와 불변 참조 동시 사용 불가
    println!("First: {}", first);
}
```

위 코드는 컴파일되지 않습니다. Rust의 소유권 시스템이 런타임 에러를 컴파일 타임에 방지합니다.

### 2. 동시성 안전성

```rust
use std::thread;

fn main() {
    let mut data = vec![1, 2, 3];
    
    thread::spawn(move || {
        data.push(4);  // data의 소유권이 스레드로 이동
    });
    
    // data.push(5);  // 컴파일 에러! data는 이미 이동됨
}
```

Rust는 컴파일 타임에 데이터 레이스를 방지합니다.

## 개발 환경 설정

### 1. Rust 설치

#### Windows
```bash
# rustup-init.exe 다운로드 후 실행
# https://rustup.rs/ 에서 다운로드
```

#### macOS/Linux
```bash
curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh
source ~/.cargo/env
```

### 2. 설치 확인

```bash
rustc --version
cargo --version
```

### 3. IDE 설정

#### VS Code
1. VS Code 설치
2. Rust 확장 설치: `rust-analyzer`
3. CodeLLDB 확장 설치 (디버깅용)

#### IntelliJ IDEA
1. IntelliJ IDEA 설치
2. Rust 플러그인 설치

## 첫 번째 Rust 프로그램

### Hello, World!

```rust
fn main() {
    println!("Hello, World!");
}
```

### 실행 방법

```bash
# 컴파일 및 실행
rustc hello.rs
./hello  # Linux/macOS
hello.exe  # Windows

# 또는 Cargo 사용
cargo new hello
cd hello
cargo run
```

### Cargo 프로젝트 구조

```
hello/
├── Cargo.toml
├── src/
│   └── main.rs
└── target/
```

## Rust 기본 문법

### 변수 선언

```rust
fn main() {
    let x = 5;           // 불변 변수
    let mut y = 10;      // 가변 변수
    
    y = 15;              // 가변 변수는 값 변경 가능
    // x = 10;           // 컴파일 에러! 불변 변수는 값 변경 불가
}
```

### 함수 정의

```rust
fn add(a: i32, b: i32) -> i32 {
    a + b  // 세미콜론 없음 = 반환값
}

fn main() {
    let result = add(5, 3);
    println!("5 + 3 = {}", result);
}
```

### 제어 흐름

```rust
fn main() {
    let number = 7;
    
    if number < 5 {
        println!("number는 5보다 작습니다");
    } else if number == 5 {
        println!("number는 5입니다");
    } else {
        println!("number는 5보다 큽니다");
    }
    
    // if는 표현식으로 사용 가능
    let result = if number > 5 { "큼" } else { "작음" };
    println!("결과: {}", result);
}
```

## 다음 단계

이제 Rust의 기본적인 개념과 환경 설정에 대해 알아보았습니다. 다음 글에서는 Rust의 핵심 개념인 **소유권(Ownership)**과 **빌림(Borrowing)**에 대해 자세히 알아보겠습니다.

## 연습 문제

1. `cargo new` 명령어로 새 프로젝트를 생성해보세요
2. 간단한 계산기 프로그램을 작성해보세요 (덧셈, 뺄셈, 곱셈, 나눗셈)
3. 사용자로부터 입력을 받아 "안녕하세요, [이름]님!"을 출력하는 프로그램을 작성해보세요

## 참고 자료

- [Rust 공식 문서](https://doc.rust-lang.org/book/)
- [Rust by Example](https://doc.rust-lang.org/rust-by-example/)
- [Rust Playground](https://play.rust-lang.org/)

다음 글에서 만나요! 🚀
