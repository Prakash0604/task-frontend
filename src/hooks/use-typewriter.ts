"use client"

import { useState, useEffect, useCallback } from "react"

interface TypewriterOptions {
        typingSpeed: number
        deletingSpeed: number
        delayBetweenWords: number
}

export function useTypewriter(
        words: string[],
        options: TypewriterOptions = {
                typingSpeed: 100,
                deletingSpeed: 50,
                delayBetweenWords: 2000,
        },
) {
        const [index, setIndex] = useState(0)
        const [subIndex, setSubIndex] = useState(0)
        const [reverse, setReverse] = useState(false)
        const [text, setText] = useState("")
        const [isTyping, setIsTyping] = useState(true)

        // Typing effect
        const typeEffect = useCallback(() => {
                if (index >= words.length) {
                        setIndex(0)
                        return
                }

                const currentWord = words[index]

                if (!reverse && subIndex < currentWord.length) {
                        // Typing
                        setIsTyping(true)
                        setText((prev) => prev + currentWord[subIndex])
                        setSubIndex((prev) => prev + 1)
                } else if (!reverse && subIndex === currentWord.length) {
                        // Finished typing, wait before deleting
                        setIsTyping(false)
                        setReverse(true)
                        setTimeout(() => {
                                setIsTyping(true)
                        }, options.delayBetweenWords)
                } else if (reverse && subIndex > 0) {
                        // Deleting
                        setIsTyping(true)
                        setText(currentWord.substring(0, subIndex - 1))
                        setSubIndex((prev) => prev - 1)
                } else if (reverse && subIndex === 0) {
                        // Finished deleting, move to next word
                        setIsTyping(false)
                        setReverse(false)
                        setIndex((prev) => prev + 1)
                }
        }, [index, subIndex, reverse, words, options.delayBetweenWords])

        useEffect(() => {
                const timeout = setTimeout(
                        () => {
                                typeEffect()
                        },
                        reverse ? options.deletingSpeed : options.typingSpeed,
                )

                return () => clearTimeout(timeout)
        }, [typeEffect, reverse, options.deletingSpeed, options.typingSpeed])

        return { text, isTyping }
}
