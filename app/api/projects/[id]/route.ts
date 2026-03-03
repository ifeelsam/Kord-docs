import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(
    request: Request,
    { params }: { params: { id: string } }
) {
    try {
        // The id is likely to be a slug but could be an CUID depending on what we passed. 
        // In ProjectGrid, we mapped id to `p.id` but wait..
        const { id } = await params
        let project = await prisma.project.findUnique({
            where: { id: id },
            include: { artist: true },
        })

        if (!project) {
            // Let's also check if it's a slug just in case
            project = await prisma.project.findUnique({
                where: { slug: id },
                include: { artist: true },
            })
        }

        if (!project) {
            return NextResponse.json(
                { error: 'Project not found' },
                { status: 404 }
            )
        }

        // Transform into standard format required by UI
        const formattedData = {
            id: project.id,
            title: project.title,
            artist: project.artist?.displayName || project.artist?.handle || 'Unknown Artist',
            artistHandle: `@${project.artist?.handle}`,
            genre: project.genre || 'Various',
            description: project.description || '',
            image: project.imageUrl || 'ipfs://QmExample', // Default if no image
            funding: {
                current: Number(project.fundingCurrent),
                goal: Number(project.fundingGoal),
            },
            token: {
                symbol: project.tokenSymbol || 'TOKEN',
                price: Number(project.tokenPrice),
                change24h: 0,
                volume24h: 0,
                lpDepth: 0,
                mint: 'So11111111111111111111111111111111111111112' // Mock mint
            },
            timeline: {
                campaignStart: project.createdAt,
                campaignEnd: project.endDate || new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // Default +30d
                deliveryDate: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000)
            },
            investors: project.totalInvestors || 0,
            tokensSold: 0,
            perks: [],
            budget: [
                { item: 'Studio Time', amount: Number(project.fundingGoal) * 0.4, percentage: 40 },
                { item: 'Mixing/Mastering', amount: Number(project.fundingGoal) * 0.24, percentage: 24 },
                { item: 'Artwork/Video', amount: Number(project.fundingGoal) * 0.16, percentage: 16 },
                { item: 'Marketing', amount: Number(project.fundingGoal) * 0.14, percentage: 14 },
                { item: 'Distribution', amount: Number(project.fundingGoal) * 0.06, percentage: 6 },
            ],
            artistFollowers: { audius: 0, socials: 0 },
            comments: [],
        }

        return NextResponse.json(formattedData, { status: 200 })

    } catch (error: any) {
        console.error('Error fetching project:', error)
        return NextResponse.json(
            { error: error.message || 'Internal server error' },
            { status: 500 }
        )
    }
}
