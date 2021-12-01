#include <iostream>
#include "Graph.cpp"
#include <time.h>
#include <math.h>
using namespace std;
#define FileDirection "E:\\MinCutTest.txt"
#define FileDirectioN2 "E:\\MinCutLongTEST.txt"

void funcToShowInt(int* var)
{
    cout<<*var<<" ";
}
int main()
{
    srand(time(nullptr));
    Graph graph;
    graph.LoadFromFile(FileDirection);
    //graph.ShowGraph(funcToShowInt);
    map<int,list<int>> aux=graph.getGraph();
    int NumNodes=graph.getNumOfNodes();
    int RepeatNTimes=500;//pow(NumNodes,2)*log10(NumNodes);
    int min=-1,ans;
    for(int i=0;i<RepeatNTimes;i++)
    {
        ans=graph.MinCut(aux);
        if(ans<min || min==-1)
        {
            min=ans;
        }
    }
    cout<<"El corte minimo es: "<<min<<endl;

    return 0;
}