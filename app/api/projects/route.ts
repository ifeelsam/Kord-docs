import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function POST(request: Request) {
    try {
        const body = await request.json()
        const {
            title,
            artistHandle,
            walletAddress,
            genre,
            description,
            fundingGoal,
            tokenSymbol,
            tokenPrice,
            campaignEnd,
        } = body

        if (!title || !artistHandle || !walletAddress || !fundingGoal || !tokenSymbol) {
            return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
        }

        let user = await prisma.user.findUnique({
            where: { handle: artistHandle }
        })

        if (!user) {
            const existingWalletUser = await prisma.user.findFirst({
                where: { walletAddress }
            })

            if (existingWalletUser) {
                user = existingWalletUser
            } else {
                user = await prisma.user.create({
                    data: {
                        handle: artistHandle,
                        displayName: artistHandle,
                        walletAddress: walletAddress,
                        role: 'ARTIST'
                    }
                })
            }
        }

        const baseSlug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-')
        let slug = baseSlug
        let counter = 1
        while (await prisma.project.findUnique({ where: { slug } })) {
            slug = `${baseSlug}-${counter}`
            counter++
        }

        const project = await prisma.project.create({
            data: {
                title,
                slug,
                artistId: user.id,
                genre,
                description,
                fundingGoal: Number(fundingGoal),
                tokenSymbol,
                tokenPrice: Number(tokenPrice),
                endDate: campaignEnd ? new Date(campaignEnd) : null,
                status: 'LIVE'
            }
        })

        return NextResponse.json(project, { status: 201 })
    } catch (error: any) {
        console.error('Error creating project:', error)
        return NextResponse.json(
            { error: error.message || 'Internal server error' },
            { status: 500 }
        )
    }
}

export async function GET() {
    try {
        const projects = await prisma.project.findMany({
            include: {
                artist: true
            },
            orderBy: {
                createdAt: 'desc'
            }
        })
        return NextResponse.json(projects, { status: 200 })
    } catch (error: any) {
        console.error('Error fetching projects:', error)
        return NextResponse.json(
            { error: error.message || 'Internal server error' },
            { status: 500 }
        )
    }
}
