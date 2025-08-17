---
title: "Rust 라이프타임"
date: 2024-01-10
draft: false
tags: ["rust", "programming", "lifetime"]
series: ["Rust 완벽 가이드"]
description: "Rust의 라이프타임 개념과 사용법을 배워봅니다."
toc: true
---

## 라이프타임이란?

라이프타임은 참조가 유효한 스코프를 나타냅니다.

```rust
fn main() {
    let r;
    
    {
        let x = 5;
        r = &x; // 에러! x의 라이프타임이 더 짧음
    }
    
    println!("r: {}", r);
}
```

## 함수에서의 라이프타임

```rust
fn longest<'a>(x: &'a str, y: &'a str) -> &'a str {
    if x.len() > y.len() {
        x
    } else {
        y
    }
}
```

## 구조체에서의 라이프타임

```rust
struct ImportantExcerpt<'a> {
    part: &'a str,
}

impl<'a> ImportantExcerpt<'a> {
    fn level(&self) -> i32 {
        3
    }
}
```

## 라이프타임 생략 규칙

컴파일러가 자동으로 라이프타임을 추론하는 규칙들이 있습니다.
