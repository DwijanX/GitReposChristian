#include <iostream>
#include "Graph.cpp"
#define FileDirection "E:\\GraphAmpTestValues.txt"
#define FileDirectionBol "E:\\Rutas_Bolivia.txt"
using namespace std;
/*
    if(graph.AmplitudeSearch(4,1))
    {
        cout<<"Busqueda en amplitud\n";
        vector<int> aux=graph.GetSavedPath(1);
        for(int i=0;i<aux.size();i++)
        {
            cout<<aux[i]<<" ";
        }
    }
    cout<<endl;
    if(graph.DeepSearch(4,1))
    {
        cout<<"Busqueda en profundidad\n";
        vector<int> aux2=graph.GetSavedPath(1);
        for(int i=0;i<aux2.size();i++)
        {
            cout<<aux2[i]<<" ";
        }
    }
    cout<<"\n";
    graph.AmplitudeSearchWotDestiny(4);
    graph.showPathsToOrigin(4);*/
void aux(pair<int,int>* var)
{
    cout<<var->first<<" ";
}
int main()
{
    Graph graph(10);
    graph.LoadFromFile(FileDirectionBol);
    //graph.ShowGraph(aux);
    cout<<"Mostrando caminos de 1\n";
    cout<<"----------------------------------------------------------------------------------------\n";
    graph.Dijkstra(1);
    graph.showPathsToOriginWithValues(1);
    return 0;
}