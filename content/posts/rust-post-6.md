---
title: "Rust 구조체와 메소드"
date: 2024-01-06
draft: false
tags: ["rust", "programming", "struct"]
series: ["Rust 완벽 가이드"]
description: "Rust의 구조체와 메소드 정의 방법을 배워봅니다."
toc: true
---

## 구조체 정의

구조체는 관련있는 데이터를 하나로 묶는 커스텀 데이터 타입입니다.

```rust
struct User {
    username: String,
    email: String,
    sign_in_count: u64,
    active: bool,
}
```

## 구조체 인스턴스 생성

```rust
let user1 = User {
    email: String::from("someone@example.com"),
    username: String::from("someusername123"),
    active: true,
    sign_in_count: 1,
};
```

## 메소드 정의

`impl` 블록을 사용하여 구조체에 메소드를 정의할 수 있습니다.

```rust
impl User {
    fn is_active(&self) -> bool {
        self.active
    }
    
    fn deactivate(&mut self) {
        self.active = false;
    }
}
```
