"use client"

import { toast } from "sonner"

export function showToast({
                              title,
                              description,
                          }) {
    toast(
        <span className="font-poppins text-sm text-dark">{title}</span>,
        {
            description: (
                <span className="font-poppins text-sm text-gray-600">
          {description}
        </span>
            ),
        }
    )
}
