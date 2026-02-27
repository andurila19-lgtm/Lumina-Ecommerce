import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardFooter } from "@/components/ui/card";

export const ProductSkeleton = () => {
    return (
        <Card className="overflow-hidden border-none bg-slate-50/50">
            <CardContent className="p-0 relative aspect-square">
                <Skeleton className="h-full w-full" />
            </CardContent>
            <CardFooter className="flex flex-col items-start p-4">
                <div className="flex justify-between w-full mb-1">
                    <Skeleton className="h-4 w-16" />
                    <Skeleton className="h-4 w-12" />
                </div>
                <Skeleton className="h-5 w-3/4 mb-2" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-5/6 mt-1" />
                <Skeleton className="h-10 w-full mt-4 rounded-full" />
            </CardFooter>
        </Card>
    );
};
