---
title: "Rust 제네릭과 트레이트"
date: 2024-01-09
draft: false
tags: ["rust", "programming", "generics"]
series: ["Rust 완벽 가이드"]
description: "Rust의 제네릭과 트레이트 시스템을 배워봅니다."
toc: true
---

## 제네릭 타입

제네릭을 사용하면 코드 중복을 줄이고 재사용성을 높일 수 있습니다.

```rust
fn largest<T: PartialOrd>(list: &[T]) -> &T {
    let mut largest = &list[0];
    
    for item in list.iter() {
        if item > largest {
            largest = item;
        }
    }
    
    largest
}
```

## 구조체에서의 제네릭

```rust
struct Point<T> {
    x: T,
    y: T,
}

impl<T> Point<T> {
    fn x(&self) -> &T {
        &self.x
    }
}
```

## 트레이트 정의

트레이트는 특정 타입이 가지고 있는 기능들을 정의합니다.

```rust
pub trait Summary {
    fn summarize(&self) -> String;
}

impl Summary for NewsArticle {
    fn summarize(&self) -> String {
        format!("{}, by {} ({})", self.headline, self.author, self.location)
    }
}
```
